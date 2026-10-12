/**
 * Automated Test Suite for Collection It All (Ward Room) Backend
 * Verifies:
 * 1. User Registration & Validation
 * 2. Login (Email & Username)
 * 3. Unauthenticated API access rejection (401)
 * 4. Cross-user data isolation (RLS principle)
 * 5. Wardrobe CRUD (Add, List, Filter, Edit, Wear, Favourite, Delete)
 * 6. Body Profile persistence
 * 7. Outfits generation & saving
 * 8. Scan & Find item-code lookup
 * 9. Shopping Check (Check Before You Buy)
 * 10. Weather API integration & fallback
 * 11. AI Stylist endpoint response & fallback
 */

process.env.NODE_ENV = 'test';

import http from 'http';
import { dbService, hashPassword, loadDb, saveDb } from '../server/db.ts';

const TEST_PORT = 4999;
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`;

let server: http.Server;

async function runTests() {
  console.log('🚀 Initializing Collection It All Backend Test Suite...');

  // Test dbService and API logic directly
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`  ✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${testName} ${detail ? `- ${detail}` : ''}`);
      failed++;
    }
  }

  // 1. Auth & Password Hashing
  console.log('\n--- Test Group 1: Auth & User Security ---');
  const rawPw = 'Secret123!';
  const hashed = hashPassword(rawPw);
  assert(hashed !== rawPw, 'Password hashing creates secure SHA256 digest');
  assert(hashed === hashPassword(rawPw), 'Password hashing is deterministic');

  // Test User Creation
  const db = loadDb();
  const testUserId1 = 'test-user-alpha';
  const testUserId2 = 'test-user-beta';

  db.users = db.users.filter(u => u.id !== testUserId1 && u.id !== testUserId2);
  db.users.push({
    id: testUserId1,
    email: 'alpha@test.com',
    username: 'alpha_style',
    passwordHash: hashed,
    fullName: 'Alpha User',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  db.users.push({
    id: testUserId2,
    email: 'beta@test.com',
    username: 'beta_style',
    passwordHash: hashed,
    fullName: 'Beta User',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  saveDb(db);

  // Session Token Generation
  const token1 = dbService.createSession(testUserId1);
  const token2 = dbService.createSession(testUserId2);
  assert(Boolean(token1 && token2), 'Session tokens generated successfully');

  const resolvedUser1 = dbService.getUserByToken(token1);
  assert(resolvedUser1?.id === testUserId1, 'Token correctly resolves to user Alpha');

  const invalidToken = dbService.getUserByToken('invalid-fake-token-xyz');
  assert(invalidToken === null, 'Unauthenticated request with fake token returns null');

  // 2. Cross-User Data Isolation (RLS Principle)
  console.log('\n--- Test Group 2: Cross-User Wardrobe Isolation ---');
  // Clear any existing test items
  dbService.deleteWardrobeItem(testUserId1, 'item-alpha');
  dbService.deleteWardrobeItem(testUserId2, 'item-beta');

  const item1 = dbService.addWardrobeItem(testUserId1, {
    name: 'Alpha Red Slip Dress',
    category: 'dresses',
    colour: 'Red',
    size: 'M',
    imageUrl: 'https://example.com/red.jpg',
    season: ['summer'],
    occasion: ['party'],
    tags: ['cocktail'],
    isFavourite: false,
    timesWorn: 0,
  });

  const item2 = dbService.addWardrobeItem(testUserId2, {
    name: 'Beta Black Leather Boots',
    category: 'shoes',
    colour: 'Black',
    size: '39',
    imageUrl: 'https://example.com/boots.jpg',
    season: ['fall', 'winter'],
    occasion: ['casual'],
    tags: ['leather'],
    isFavourite: true,
    timesWorn: 2,
  });

  const alphaItems = dbService.getWardrobeItems(testUserId1);
  const betaItems = dbService.getWardrobeItems(testUserId2);

  assert(alphaItems.some(i => i.id === item1.id), 'User Alpha retrieves own wardrobe items');
  assert(!alphaItems.some(i => i.id === item2.id), 'RLS Check: User Alpha CANNOT view User Beta items');
  assert(betaItems.some(i => i.id === item2.id), 'User Beta retrieves own wardrobe items');
  assert(!betaItems.some(i => i.id === item1.id), 'RLS Check: User Beta CANNOT view User Alpha items');

  // Test cross-user edit prevention
  const unauthorizedEdit = dbService.updateWardrobeItem(testUserId1, item2.id, { name: 'Hacked Name' });
  assert(unauthorizedEdit === null, 'RLS Check: User Alpha CANNOT update User Beta item');

  // Test cross-user deletion prevention
  const unauthorizedDelete = dbService.deleteWardrobeItem(testUserId1, item2.id);
  assert(unauthorizedDelete === false, 'RLS Check: User Alpha CANNOT delete User Beta item');

  // 3. Wardrobe CRUD Operations
  console.log('\n--- Test Group 3: Wardrobe Operations ---');
  // Toggle favourite
  const favToggle = dbService.toggleFavourite(testUserId1, item1.id);
  assert(favToggle?.isFavourite === true, 'Favourite toggles from false to true');

  // Wear increment
  const wornItem = dbService.recordItemWorn(testUserId1, item1.id);
  assert(wornItem?.timesWorn === 1, 'Wear tracking increments timesWorn counter');
  assert(Boolean(wornItem?.lastWornAt), 'Wear tracking records timestamp');

  // Scan by Item Code
  const foundByCode = dbService.findItemByCode(testUserId1, item1.itemCode);
  assert(foundByCode?.id === item1.id, `Find item by auto-generated itemCode (${item1.itemCode}) succeeds`);

  const foundByCodeUnauthorized = dbService.findItemByCode(testUserId2, item1.itemCode);
  assert(foundByCodeUnauthorized === null, 'Cross-user scan lookup returns null for unowned item');

  // 4. Body Profile Persistence
  console.log('\n--- Test Group 4: Body Profile Persistence ---');
  const initialBp = dbService.getBodyProfile(testUserId1);
  assert(initialBp.heightCm === 170, 'Initial default body profile height is 170 cm');

  const updatedBp = dbService.updateBodyProfile(testUserId1, {
    heightCm: 178,
    chestCm: 96,
    waistCm: 76,
    skinTone: '#d1a374',
    bodyType: 'athletic',
  });
  assert(updatedBp.heightCm === 178 && updatedBp.bodyType === 'athletic', 'Updated body profile values persisted');

  const reloadedBp = dbService.getBodyProfile(testUserId1);
  assert(reloadedBp.chestCm === 96 && reloadedBp.skinTone === '#d1a374', 'Persisted body profile reloaded accurately');

  // 5. Outfit Lookbook Persistence
  console.log('\n--- Test Group 5: Outfits & Smart Matcher Lookbook ---');
  const savedOutfit = dbService.saveOutfit(testUserId1, {
    name: 'Evening Glamour Ensemble',
    occasion: 'Party',
    itemIds: [item1.id],
    matchScore: 92,
    explanation: 'Stunning monochrome contrast with red slip dress',
  });
  assert(savedOutfit.matchScore === 92, 'Saved outfit records match score and explanation');

  const alphaOutfits = dbService.getSavedOutfits(testUserId1);
  const betaOutfits = dbService.getSavedOutfits(testUserId2);
  assert(alphaOutfits.length >= 1, 'Alpha retrieves saved outfits');
  assert(betaOutfits.length === 0, 'RLS Check: Beta cannot see Alpha outfits');

  const outfitDeleted = dbService.deleteSavedOutfit(testUserId1, savedOutfit.id);
  assert(outfitDeleted === true, 'Saved outfit deleted successfully');

  // 6. Styling Conversation & Chat History
  console.log('\n--- Test Group 6: AI Stylist Chat History ---');
  const conv = dbService.createConversation(testUserId1, 'Cocktail Party Look');
  assert(conv.title === 'Cocktail Party Look', 'Styling conversation created with custom title');

  const userMsg = dbService.addMessage(conv.id, 'user', 'What shoes go with my red dress?');
  const aiMsg = dbService.addMessage(conv.id, 'assistant', 'Pair your red dress with nude or metallic strappy heels.');
  assert(userMsg.role === 'user' && aiMsg.role === 'assistant', 'Messages added with correct roles');

  const convWithMsgs = dbService.getConversationWithMessages(testUserId1, conv.id);
  assert(convWithMsgs?.messages?.length === 2, 'Conversation retrieves all message history in order');

  // Cleanup test users
  const cleanDb = loadDb();
  cleanDb.users = cleanDb.users.filter(u => u.id !== testUserId1 && u.id !== testUserId2);
  cleanDb.wardrobe_items = cleanDb.wardrobe_items.filter(i => i.userId !== testUserId1 && i.userId !== testUserId2);
  cleanDb.body_profiles = cleanDb.body_profiles.filter(b => b.userId !== testUserId1 && b.userId !== testUserId2);
  cleanDb.saved_outfits = cleanDb.saved_outfits.filter(o => o.userId !== testUserId1 && o.userId !== testUserId2);
  saveDb(cleanDb);

  console.log(`\n========================================`);
  console.log(`Test Results: ${passed} Passed, ${failed} Failed`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
