// Smart Recommendation Engine for Voice Command Shopping Assistant
import { MOCK_CATALOG } from '../data/mockCatalog';

/**
 * Gets product recommendations based on shopping history & restock frequency
 */
export function getHistoryBasedRecommendations(currentShoppingList) {
  const currentNames = currentShoppingList.map(item => item.name.toLowerCase());
  
  // Rule-based frequent staples that users re-order frequently
  const frequentStaples = [
    { name: 'Whole Wheat Bread', reason: 'You usually re-order bread every 5 days', category: 'Bakery' },
    { name: 'Whole Milk', reason: 'Running low based on weekly consumption pattern', category: 'Dairy & Eggs' },
    { name: 'Fresh Bananas', reason: 'High frequency purchase item', category: 'Produce' },
    { name: 'Greek Yogurt (Plain)', reason: 'Staple breakfast item running low', category: 'Dairy & Eggs' }
  ];

  return frequentStaples
    .filter(staple => !currentNames.some(name => name.includes(staple.name.toLowerCase())))
    .map(staple => {
      const catalogItem = MOCK_CATALOG.find(cat => cat.name.toLowerCase().includes(staple.name.toLowerCase()));
      return {
        id: `rec-hist-${Math.random()}`,
        name: staple.name,
        reason: staple.reason,
        category: staple.category,
        price: catalogItem ? catalogItem.price : 2.99,
        unit: catalogItem ? catalogItem.unit : 'each',
        badge: 'Restock Alert'
      };
    });
}

/**
 * Gets seasonal recommendations based on current month/season
 */
export function getSeasonalRecommendations(currentShoppingList) {
  const currentNames = currentShoppingList.map(item => item.name.toLowerCase());
  const month = new Date().getMonth(); // 0-11
  
  let currentSeason = 'Summer';
  if (month >= 2 && month <= 4) currentSeason = 'Spring';
  else if (month >= 5 && month <= 7) currentSeason = 'Summer';
  else if (month >= 8 && month <= 10) currentSeason = 'Autumn';
  else currentSeason = 'Winter';

  const seasonalItems = MOCK_CATALOG.filter(item => 
    item.seasonal === currentSeason || item.seasonal === 'Summer'
  );

  return seasonalItems
    .filter(item => !currentNames.some(name => name.includes(item.name.toLowerCase())))
    .map(item => ({
      id: `rec-season-${item.id}`,
      name: item.name,
      reason: `Freshly harvested in ${currentSeason} (Peak Flavor & Price)`,
      category: item.category,
      price: item.price,
      unit: item.unit,
      badge: `${currentSeason} Choice`,
      organic: item.organic
    }));
}

/**
 * Finds smart substitutes or alternatives for a given product
 */
export function getSubstitutesForItem(productName) {
  if (!productName) return [];
  const nameLower = productName.toLowerCase();
  
  const catalogItem = MOCK_CATALOG.find(item => 
    item.name.toLowerCase().includes(nameLower) || nameLower.includes(item.name.toLowerCase())
  );

  if (catalogItem && catalogItem.substitutes) {
    return catalogItem.substitutes.map(subName => {
      const subCatalog = MOCK_CATALOG.find(m => m.name.toLowerCase() === subName.toLowerCase());
      return {
        original: catalogItem.name,
        name: subName,
        price: subCatalog ? subCatalog.price : catalogItem.price,
        unit: subCatalog ? subCatalog.unit : catalogItem.unit,
        category: catalogItem.category,
        reason: getSubstituteReason(catalogItem.name, subName)
      };
    });
  }

  // Generic fallbacks
  if (nameLower.includes('milk')) {
    return [
      { original: productName, name: 'Almond Milk', price: 3.99, category: 'Dairy & Eggs', reason: 'Plant-based & lower calorie alternative' },
      { original: productName, name: 'Oat Milk', price: 4.29, category: 'Dairy & Eggs', reason: 'Creamy dairy-free option' }
    ];
  }
  if (nameLower.includes('bread')) {
    return [
      { original: productName, name: 'Whole Wheat Bread', price: 2.99, category: 'Bakery', reason: 'Higher fiber & organic grains' }
    ];
  }

  return [];
}

function getSubstituteReason(original, substitute) {
  if (substitute.includes('Almond') || substitute.includes('Oat')) {
    return 'Lactose-free & healthier plant-based alternative';
  }
  if (substitute.includes('Wheat') || substitute.includes('Sourdough')) {
    return 'Nutrient-rich whole grain choice';
  }
  if (substitute.includes('Organic') || substitute.includes('Blueberries')) {
    return 'Antioxidant rich & pesticide-free choice';
  }
  return 'Popular alternative preferred by shoppers';
}
