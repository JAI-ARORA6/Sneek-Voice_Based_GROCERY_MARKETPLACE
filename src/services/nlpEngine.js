// Advanced Natural Language Processing (NLP) Engine for Voice Commands

const SPELL_CORRECTIONS = {
  'tht': 'that',
  'ot': 'oat',
  'oats': 'oat',
  'otmilk': 'oat milk',
  'oatmilk': 'oat milk',
  'almon': 'almond',
  'alamond': 'almond',
  'almondmilk': 'almond milk',
  'while': 'whole',
  'doloor': 'dollar',
  'doloors': 'dollar',
  'dolor': 'dollar',
  'dolors': 'dollar',
  'doolar': 'dollar',
  'dolar': 'dollar',
  'dolloar': 'dollar',
  'dollars': 'dollar',
  'bux': 'bucks',
  'bucs': 'bucks',
  'buk': 'bucks',
  'stwawbery': 'strawberry',
  'stowberry': 'strawberry',
  'strawbery': 'strawberry',
  'strawberries': 'strawberry',
  'banan': 'banana',
  'bananaz': 'banana',
  'mik': 'milk',
  'mulk': 'milk',
  'vagitables': 'vegetables',
  'vegies': 'vegetables',
  'veggie': 'vegetables',
  'froots': 'fruits',
  'fruts': 'fruits',
  'fruitz': 'fruits',
  'produc': 'products',
  'product': 'products',
  'beverrsage': 'beverages',
  'beverage': 'beverages',
  'beverag': 'beverages',
  'bev': 'beverages',
  'fiv': 'five',
  'tu': 'two',
  'tree': 'three',
  'uts': 'it'
};

const NUMBER_MAP = {
  'one': 1, 'a': 1, 'an': 1, 'un': 1, 'une': 1, 'ein': 1, 'eine': 1, 'एक': 1,
  'two': 2, 'dos': 2, 'deux': 2, 'zwei': 2, 'दो': 2,
  'three': 3, 'tres': 3, 'trois': 3, 'drei': 3, 'तीन': 3,
  'four': 4, 'cuatro': 4, 'quatre': 4, 'vier': 4, 'चार': 4,
  'five': 5, 'cinco': 5, 'cinq': 5, 'fünf': 5, 'पांच': 5,
  'six': 6, 'seis': 6, 'sechs': 6, 'छह': 6,
  'seven': 7, 'siete': 7, 'sept': 7, 'sieben': 7, 'सात': 7,
  'eight': 8, 'ocho': 8, 'huit': 8, 'acht': 8, 'आठ': 8,
  'nine': 9, 'nueve': 9, 'neuf': 9, 'neun': 9, 'नौ': 9,
  'ten': 10, 'diez': 10, 'dix': 10, 'zehn': 10, 'दस': 10,
  'twenty': 20, 'thirty': 30, 'fifty': 50, 'dozen': 12
};

const CATEGORY_SYNONYMS = {
  'Produce': ['produce', 'fruit', 'fruits', 'vegetable', 'vegetables', 'veggie', 'veggies', 'apple', 'apples', 'banana', 'bananas', 'strawberry', 'strawberries', 'corn', 'avocado', 'avocados', 'berry', 'berries', 'pumpkin', 'pumpkins', 'frutas', 'verduras', 'légumes', 'obst', 'gemüse', 'फल', 'सब्जियां'],
  'Dairy & Eggs': ['dairy', 'milk', 'egg', 'eggs', 'yogurt', 'cheese', 'butter', 'cream', 'lácteos', 'huevos', 'laiterie', 'milchprodukte', 'डेयरी'],
  'Bakery': ['bakery', 'bread', 'breads', 'loaf', 'loaves', 'bagel', 'muffin', 'cake', 'panadería', 'boulangerie', 'bäckerei', 'बेकरी'],
  'Beverages': ['beverages', 'beverage', 'drink', 'drinks', 'water', 'juice', 'soda', 'tea', 'coffee', 'bebidas', 'boissons', 'getränke', 'पेय पदार्थ'],
  'Snacks': ['snacks', 'snack', 'chocolate', 'chips', 'candy', 'cookies', 'nuts', 'bocadillos', 'goûter', 'स्नैक्स'],
  'Pantry': ['pantry', 'oil', 'flour', 'sugar', 'rice', 'pasta', 'aceite', 'huile', 'öl', 'तेल'],
  'Personal Care': ['personal care', 'toothpaste', 'soap', 'shampoo']
};

export const MULTILINGUAL_PRODUCT_MAP = {
  // Spanish
  'leche': 'Whole Milk',
  'leches': 'Whole Milk',
  'manzana': 'Organic Honeycrisp Apples',
  'manzanas': 'Organic Honeycrisp Apples',
  'plátano': 'Organic Bananas',
  'platano': 'Organic Bananas',
  'plátanos': 'Organic Bananas',
  'pan': 'Artisan Sourdough Bread',
  'fresa': 'Fresh Strawberries',
  'fresas': 'Fresh Strawberries',
  'aguacate': 'Organic Hass Avocado',
  'aguacates': 'Organic Hass Avocado',
  'yogur': 'Greek Yogurt Honey',
  'agua': 'Sparkling Mineral Water',
  'aceite': 'Extra Virgin Olive Oil',
  'maíz': 'Sweet Corn',
  'maiz': 'Sweet Corn',
  'pasta': 'Artisan Sourdough Bread',
  'chocolat': 'Dark Chocolate Bar',

  // French
  'lait': 'Whole Milk',
  'laits': 'Whole Milk',
  'pomme': 'Organic Honeycrisp Apples',
  'pommes': 'Organic Honeycrisp Apples',
  'banane': 'Organic Bananas',
  'bananes': 'Organic Bananas',
  'pain': 'Artisan Sourdough Bread',
  'fraise': 'Fresh Strawberries',
  'fraises': 'Fresh Strawberries',
  'avocat': 'Organic Hass Avocado',
  'avocats': 'Organic Hass Avocado',
  'yaourt': 'Greek Yogurt Honey',
  'eau': 'Sparkling Mineral Water',
  'huile': 'Extra Virgin Olive Oil',

  // German
  'milch': 'Whole Milk',
  'apfel': 'Organic Honeycrisp Apples',
  'äpfel': 'Organic Honeycrisp Apples',
  'brot': 'Artisan Sourdough Bread',
  'erdbeere': 'Fresh Strawberries',
  'erdbeeren': 'Fresh Strawberries',
  'wasser': 'Sparkling Mineral Water',
  'joghurt': 'Greek Yogurt Honey',
  'öl': 'Extra Virgin Olive Oil',

  // Hindi
  'दूध': 'Whole Milk',
  'सेब': 'Organic Honeycrisp Apples',
  'केला': 'Organic Bananas',
  'केले': 'Organic Bananas',
  'ब्रेड': 'Artisan Sourdough Bread',
  'स्ट्रॉबेरी': 'Fresh Strawberries',
  'एवोकाडो': 'Organic Hass Avocado',
  'पानी': 'Sparkling Mineral Water',
  'दही': 'Greek Yogurt Honey',
  'तेल': 'Extra Virgin Olive Oil',
  'मक्का': 'Sweet Corn',
  'चॉकलेट': 'Dark Chocolate Bar'
};

export function resolveMultilingualProductName(rawQuery) {
  if (!rawQuery) return rawQuery;
  const q = rawQuery.toLowerCase().trim();
  if (MULTILINGUAL_PRODUCT_MAP[q]) return MULTILINGUAL_PRODUCT_MAP[q];

  const tokens = q.split(/\s+/);
  for (const token of tokens) {
    if (MULTILINGUAL_PRODUCT_MAP[token]) {
      return MULTILINGUAL_PRODUCT_MAP[token];
    }
  }

  return rawQuery;
}

/**
 * Phonetic & Speech Correction Helper
 */
export function correctSpeechTypos(rawText) {
  if (!rawText) return '';
  const words = rawText.toLowerCase().trim().split(/\s+/);
  const corrected = words.map(w => {
    const cleanWord = w.replace(/[.,!?]/g, '');
    return SPELL_CORRECTIONS[cleanWord] || cleanWord;
  });
  return corrected.join(' ');
}

/**
 * Parses Min & Max Price Bounds e.g. "above 5 dollor but less than 6 dollor", "between 3 and 7", "under 5"
 */
export function extractPriceBounds(text) {
  let minPrice = 0;
  let maxPrice = 20;
  let isAboveQuery = false;
  let isRangeQuery = false;

  const rangeRegex = /(?:between|from)\s*\$?(\d+(?:\.\d+)?|\b(?:one|two|three|four|five|six|seven|eight|nine|ten)\b)\s*(?:and|to|-)\s*\$?(\d+(?:\.\d+)?|\b(?:one|two|three|four|five|six|seven|eight|nine|ten)\b)/i;
  const rangeMatch = text.match(rangeRegex);

  if (rangeMatch) {
    const val1 = !isNaN(parseFloat(rangeMatch[1])) ? parseFloat(rangeMatch[1]) : NUMBER_MAP[rangeMatch[1].toLowerCase()];
    const val2 = !isNaN(parseFloat(rangeMatch[2])) ? parseFloat(rangeMatch[2]) : NUMBER_MAP[rangeMatch[2].toLowerCase()];
    if (val1 && val2) {
      minPrice = Math.min(val1, val2);
      maxPrice = Math.max(val1, val2);
      return { minPrice, maxPrice, isAboveQuery: false, isRangeQuery: true };
    }
  }

  const aboveRegex = /(?:above|over|more than|greater than|at least|min|minimum|from|higher than)\s*\$?(\d+(?:\.\d+)?|\b(?:one|two|three|four|five|six|seven|eight|nine|ten|twenty|thirty)\b)(?:\s*(?:dollars?|doloors?|dolor?|bucks?|usd|bucs?))?/i;
  const aboveMatch = text.match(aboveRegex);

  if (aboveMatch) {
    const rawNum = aboveMatch[1].toLowerCase();
    const parsedVal = !isNaN(parseFloat(rawNum)) ? parseFloat(rawNum) : NUMBER_MAP[rawNum];
    if (parsedVal) {
      minPrice = parsedVal;
      isAboveQuery = true;
    }
  }

  const underRegex = /(?:under|below|less than|max|maximum|cheaper than|within|about|around|up to|for)\s*\$?(\d+(?:\.\d+)?|\b(?:one|two|three|four|five|six|seven|eight|nine|ten|twenty|thirty)\b)(?:\s*(?:dollars?|doloors?|dolor?|bucks?|usd|bucs?))?/i;
  const underMatch = text.match(underRegex);

  if (underMatch) {
    const rawNum = underMatch[1].toLowerCase();
    const parsedVal = !isNaN(parseFloat(rawNum)) ? parseFloat(rawNum) : NUMBER_MAP[rawNum];
    if (parsedVal) {
      maxPrice = parsedVal;
    }
  }

  if (aboveMatch && underMatch) {
    isRangeQuery = true;
  }

  if (!aboveMatch && !underMatch && !rangeMatch) {
    const standaloneDollar = text.match(/\$?(\d+(?:\.\d+)?)\s*(?:dollars?|doloors?|dolor?|bucks?)/i) || text.match(/\$(\d+(?:\.\d+)?)/);
    if (standaloneDollar) {
      maxPrice = parseFloat(standaloneDollar[1]);
    }
  }

  return { minPrice, maxPrice, isAboveQuery, isRangeQuery };
}

/**
 * Main NLP Voice Command Parser
 */
export function parseVoiceCommand(rawTranscript, lang = 'en-US') {
  if (!rawTranscript || typeof rawTranscript !== 'string') {
    return { intent: 'UNKNOWN', confidence: 0, text: '' };
  }

  const rawText = rawTranscript.trim();
  const text = correctSpeechTypos(rawText);

  const priceBounds = extractPriceBounds(text);
  const hasPriceQuery = priceBounds.minPrice > 0 || priceBounds.maxPrice < 20 || text.includes('$') || text.includes('dollar') || text.includes('bucks') || text.includes('above') || text.includes('over') || text.includes('under') || text.includes('below') || text.includes('between');
  const hasSearchVerbs = /^(find|search|look for|where is|where are|show me|filter|what|which|available|browse|buscar|chercher|suchen)/i.test(text) || text.includes('under') || text.includes('above') || text.includes('over') || text.includes('below') || text.includes('cheaper') || text.includes('less than') || text.includes('products') || text.includes('items') || text.includes('section') || text.includes('category');

  const categoryMatch = Object.keys(CATEGORY_SYNONYMS).find(cat => {
    const keywords = CATEGORY_SYNONYMS[cat];
    return keywords.some(kw => text.includes(kw));
  });

  const isGenericCategoryQuery = categoryMatch && (
    text.includes('section') ||
    text.includes('category') ||
    text.includes('anything') ||
    text.includes('something') ||
    text.includes('items') ||
    text.includes('options') ||
    text.includes('show') ||
    text.includes('available') ||
    !/^(add|buy|put|need|get)\s+[a-z0-9\s]+(milk|apple|banana|bread|strawberry|water|toothpaste|pumpkin|oil|corn|avocado)/i.test(text)
  );

  // 1. Detect Category Browsing & Search Queries (NEVER ADD ITEM TO CART)
  if (isGenericCategoryQuery || (hasSearchVerbs && !/^(add|buy|put|need|get)\s+(?!anything|something|items|from|section)/i.test(text)) || (hasPriceQuery && !/^(add|buy|put|need|get)\s+(?!anything|something|items|from|section)/i.test(text))) {
    let query = text
      .replace(/^(find me|find|search for|search|look for|where is|where are|show me|filter|what|which|available|browse|want items from|want|items from|items|from)\s+/gi, '')
      .replace(/(?:products in list|products|items)?\s*(?:that are|which are|that|is|are)?\s*(?:above|over|more than|greater than|under|below|less than|max|maximum|cheaper than|within|about|around|for)\s*\$?(\d+(?:\.\d+)?|\b(?:one|two|three|four|five|six|seven|eight|nine|ten|twenty|thirty)\b)(?:\s*(?:dollars?|doloors?|dolor?|bucks?|usd|bucs?))?/gi, '')
      .replace(/(?:dollars?|doloors?|dolor?|bucks?|usd|bucs?|\$\d+)/gi, '')
      .replace(/(?:section|category|available|options)+$/gi, '')
      .trim();

    query = sanitizeItemName(query);

    if (!query || ['products', 'product', 'items', 'item', 'anything', 'stuff', 'food', 'all', 'in list', 'section', 'category'].includes(query.toLowerCase())) {
      query = categoryMatch || 'all';
    }

    return {
      intent: 'SEARCH_FILTER',
      rawText: rawTranscript,
      correctedText: text,
      query: query,
      categoryFilter: categoryMatch || null,
      minPrice: priceBounds.minPrice,
      maxPrice: priceBounds.maxPrice,
      isAboveQuery: priceBounds.isAboveQuery,
      isRangeQuery: priceBounds.isRangeQuery,
      organicOnly: text.includes('organic') || text.includes('orgánico') || text.includes('bio')
    };
  }

  // 1.5 Detect Cart, Checkout, Order & Help Intents
  const openCartKeywords = ['open cart', 'view cart', 'show cart', 'my cart', 'go to cart', 'open my cart', 'checkout', 'show shopping cart', 'ver carrito', 'abrir carrito', 'carrito'];
  const isCartIntent = openCartKeywords.some(kw => text.includes(kw));

  if (isCartIntent) {
    return {
      intent: 'OPEN_CART',
      rawText: rawTranscript,
      correctedText: text
    };
  }

  const placeOrderKeywords = ['place order', 'complete order', 'confirm order', 'buy now', 'confirm purchase', 'pay now', 'place my order', 'order now', 'hacer pedido', 'comprar todo'];
  const isOrderIntent = placeOrderKeywords.some(kw => text.includes(kw));

  if (isOrderIntent) {
    return {
      intent: 'PLACE_ORDER',
      rawText: rawTranscript,
      correctedText: text
    };
  }

  const helpKeywords = ['voice help', 'help me', 'what can i say', 'commands', 'voice commands', 'ayuda', 'options'];
  const isHelpIntent = helpKeywords.some(kw => text === kw || text.startsWith(kw));

  if (isHelpIntent) {
    return {
      intent: 'VOICE_HELP',
      rawText: rawTranscript,
      correctedText: text
    };
  }

  // 2. Detect Clear List Intent
  if (text.includes('clear my list') || text.includes('delete all items') || text.includes('empty cart') || text.includes('borrar lista')) {
    return {
      intent: 'CLEAR_LIST',
      rawText: rawTranscript,
      correctedText: text
    };
  }

  // 3. Detect Remove / Delete Intent
  const removePatterns = [
    /(?:remove|delete|take off|drop|subtract|reduce|eliminar|quitar|supprimer|löschen|हटाएं)\s+(?:(\d+|one|two|three|four|five|six|seven|eight|nine|ten|a|an)\s+)?(?:bottles?|packs?|bags?|loaves|loaf|cartons?|bunches?|tub|tubs|quantity of|quantities of|number of|count of|pieces of|items of|nos of|pcs of|of\s+)?(.*)/i
  ];

  for (const pattern of removePatterns) {
    const match = text.match(pattern);
    if (match) {
      const quantityStr = match[1];
      let rawItem = match[2];
      const cleanedItem = sanitizeItemName(rawItem);

      if (cleanedItem) {
        return {
          intent: 'REMOVE_ITEM',
          rawText: rawTranscript,
          correctedText: text,
          itemName: cleanedItem,
          quantity: quantityStr ? parseQuantity(quantityStr) : 1,
          hasExplicitQuantity: !!quantityStr
        };
      }
    }
  }

  // 4. Detect Explicit Add / Buy Intent (Supports both Prefix e.g. "Add 2 apples" and Postfix e.g. "केला ऐड करें" / "2 apples add")
  const addPhrases = [
    /^(?:add|put|buy|need|want to buy|can you add|añadir|comprar|necesito|ajouter|acheter|hinzufügen|kaufen|जोड़ें|खरीदें|ऐड करें|ऐड करो|ऐड)\s+(?:(\d+|one|two|three|four|five|six|seven|eight|nine|ten|a|an|a dozen|एक|दो|तीन|चार|पांच)\s+)?(?:bottles?|packs?|bags?|loaves|loaf|cartons?|bunches?|ears?|tub|tubs|bars?|kg|lbs?|quantity of|quantities of|number of|count of|pieces of|items of|nos of|pcs of|units of|of\s+)?(.*)/i,
    /^(?:(\d+|one|two|three|four|five|six|seven|eight|nine|ten|a|an|एक|दो|तीन|चार|पांच)\s+)?(.*)\s+(?:ऐड करें|ऐड करो|ऐड कर दो|ऐड|जोड़ें|जोड़ो|डाल दो|लाओ|खरीदें|karo|karen|add|buy)$/i
  ];

  for (const pattern of addPhrases) {
    const match = text.match(pattern);
    if (match) {
      const quantityStr = match[1];
      let rawItem = match[2];
      const cleanedItem = sanitizeItemName(rawItem);

      if (cleanedItem && !['anything', 'something', 'items', 'stuff', 'options', 'section', 'category'].includes(cleanedItem.toLowerCase())) {
        return {
          intent: 'ADD_ITEM',
          rawText: rawTranscript,
          correctedText: text,
          itemName: cleanedItem,
          quantity: parseQuantity(quantityStr) || 1,
          maxPrice: priceBounds.maxPrice !== 20 ? priceBounds.maxPrice : null,
          category: detectCategory(cleanedItem),
          isOrganic: text.includes('organic') || text.includes('orgánico') || text.includes('bio')
        };
      }
    }
  }

  // STRICT GUARD: No fallback auto-addition! Return UNKNOWN for unrecognized noise or test text.
  return {
    intent: 'UNKNOWN',
    rawText: rawTranscript,
    correctedText: text
  };
}

/**
 * Parses numeric or word quantities
 */
function parseQuantity(qStr) {
  if (!qStr) return 1;
  const cleaned = qStr.toLowerCase().trim();
  if (!isNaN(parseInt(cleaned))) {
    return parseInt(cleaned);
  }
  return NUMBER_MAP[cleaned] || 1;
}

/**
 * Clean common noise words, units, filler phrases, and price clauses from parsed item name
 */
export function sanitizeItemName(str) {
  if (!str) return '';
  const cleaned = str
    .toLowerCase()
    .replace(/(?:that are|which are|that|is|are)?\s*(?:less than|under|below|above|over|more than|cheaper than|over|for|about|around)\s*\$?(\d+(?:\.\d+)?|\b(?:one|two|three|four|five|six|seven|eight|nine|ten|twenty|thirty)\b)(?:\s*(?:dollars?|doloors?|dolor?|bucks?|usd|bucs?))?/gi, '')
    .replace(/(?:from my list|from list|from the list|from cart|from it|from here|to my list|to list|on my list|in my list|out of my list|de mi lista|de la liste|aus der liste|it|please)+$/gi, '')
    .replace(/(?:\s*(?:ऐड करें|ऐड करो|ऐड कर दो|ऐड|जोड़ें|जोड़ो|डाल दो|करो|करें|लाओ|खरीदें|karo|karen|add|buy))+$/gi, '')
    .replace(/^(to|my|the|a|an|some|a few|of|for|on|list|shopping list|quantity of|quantities of|number of|count of|pieces of|pcs of|items of|nos of|units of|amount of)\s+/gi, '')
    .replace(/^of\s+/gi, '')
    .replace(/[.,!?]/g, '')
    .trim();

  return resolveMultilingualProductName(cleaned);
}

/**
 * Capitalizes word strings nicely (e.g. "mangos" -> "Mangos")
 */
export function capitalizeItemName(str) {
  if (!str) return '';
  return str
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Fuzzy catalog match to match user spoken term against mock catalog with strict price bound filtering and relevance scoring
 */
export function findBestCatalogMatch(catalog, queryName, maxPrice = null) {
  if (!catalog || catalog.length === 0 || !queryName) return null;
  const rawQ = queryName.toLowerCase().trim();
  const resolvedName = resolveMultilingualProductName(rawQ);
  const q = resolvedName.toLowerCase().trim();

  const pool = (maxPrice !== null && maxPrice > 0)
    ? catalog.filter(item => item.price <= maxPrice)
    : catalog;

  if (pool.length === 0) return null;

  let bestMatch = null;
  let highestScore = -1;

  for (const item of pool) {
    const itemName = item.name.toLowerCase();
    const tags = item.tags || [];
    let score = 0;

    if (itemName === q) {
      score = 100;
    } else if (itemName.startsWith(q) || q.startsWith(itemName) || itemName.endsWith(q) || q.endsWith(itemName)) {
      score = 90;
    } else if (itemName.includes(q) || q.includes(itemName)) {
      score = 70;
    } else {
      const qTokens = q.split(/\s+/);
      const itemTokens = itemName.split(/\s+/);
      
      let tokenMatches = 0;
      let modifierMatched = false;

      for (const qToken of qTokens) {
        if (qToken.length < 2) continue;
        
        const matchFound = itemTokens.some(it => it === qToken || it.includes(qToken) || qToken.includes(it) || isLevenshteinClose(qToken, it)) ||
          tags.some(tag => tag === qToken || isLevenshteinClose(qToken, tag));

        if (matchFound) {
          tokenMatches++;
          if (['almond', 'oat', 'soy', 'coconut', 'wheat', 'white', 'honeycrisp', 'banana', 'strawberry'].includes(qToken)) {
            modifierMatched = true;
          }
        }
      }

      if (tokenMatches > 0) {
        score = tokenMatches * 15 + (modifierMatched ? 40 : 0);
      }
    }

    if (score > highestScore && score > 0) {
      highestScore = score;
      bestMatch = item;
    }
  }

  return bestMatch;
}

/**
 * Finds exact or strict name match in shopping list
 */
export function findExactShoppingListItem(itemsList, targetName) {
  if (!itemsList || itemsList.length === 0 || !targetName) return null;
  const q = targetName.toLowerCase().trim();
  return itemsList.find(item => item.name.toLowerCase() === q);
}

/**
 * Fuzzy / Best Match algorithm to match user spoken item against shopping list items for removal
 */
export function findBestItemMatch(itemsList, queryName) {
  if (!itemsList || itemsList.length === 0 || !queryName) return null;
  const q = queryName.toLowerCase().trim();

  let match = itemsList.find(item => item.name.toLowerCase() === q);
  if (match) return match;

  const modifiers = ['almond', 'oat', 'soy', 'coconut', 'whole', 'white', 'wheat', 'honeycrisp', 'strawberry', 'banana'];
  const queryModifiers = modifiers.filter(m => q.includes(m));

  match = itemsList.find(item => {
    const itemName = item.name.toLowerCase();

    if (queryModifiers.length > 0) {
      return queryModifiers.every(m => itemName.includes(m));
    }

    return itemName.includes(q) || q.includes(itemName);
  });

  if (match) return match;

  const qTokens = q.split(/\s+/);
  for (const item of itemsList) {
    const itemName = item.name.toLowerCase();
    const itemTokens = itemName.split(/\s+/);
    
    if (queryModifiers.length > 0 && !queryModifiers.every(m => itemName.includes(m))) {
      continue;
    }

    for (const qToken of qTokens) {
      if (qToken.length < 2) continue;
      for (const itemToken of itemTokens) {
        if (itemToken === qToken || isLevenshteinClose(qToken, itemToken)) {
          return item;
        }
      }
    }
  }

  return null;
}

function isLevenshteinClose(str1, str2) {
  if (Math.abs(str1.length - str2.length) > 3) return false;
  let diffs = 0;
  const minLen = Math.min(str1.length, str2.length);
  for (let i = 0; i < minLen; i++) {
    if (str1[i] !== str2[i]) diffs++;
  }
  diffs += Math.abs(str1.length - str2.length);
  return diffs <= 3;
}

/**
 * Automatically infers grocery category from item name or query
 */
export function detectCategory(itemName) {
  if (!itemName) return 'Pantry';
  const name = itemName.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_SYNONYMS)) {
    if (keywords.some(kw => name.includes(kw) || kw.includes(name))) {
      return category;
    }
  }
  return 'Pantry';
}
