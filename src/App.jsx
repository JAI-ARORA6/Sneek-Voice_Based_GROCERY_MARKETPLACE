import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import ProductGrid from './components/ProductGrid';
import ShoppingList from './components/ShoppingList';
import SmartSuggestions from './components/SmartSuggestions';
import VoiceSearchModal from './components/VoiceSearchModal';
import QuickManualInput from './components/QuickManualInput';
import ToastNotification from './components/ToastNotification';
import WhySneekModal from './components/WhySneekModal';
import FAQModal from './components/FAQModal';
import ContactModal from './components/ContactModal';
import CartModal from './components/CartModal';
import FloatingVoiceController from './components/FloatingVoiceController';

import { INITIAL_SHOPPING_LIST, MOCK_CATALOG } from './data/mockCatalog';
import { parseVoiceCommand, detectCategory, findBestItemMatch, findBestCatalogMatch, capitalizeItemName, findExactShoppingListItem } from './services/nlpEngine';
import { voiceService } from './services/voiceService';
import { getSubstitutesForItem } from './services/recommendationEngine';

export default function App() {
  // Persistence in LocalStorage
  const [shoppingList, setShoppingList] = useState(() => {
    const saved = localStorage.getItem('voice_shopping_list');
    return saved ? JSON.parse(saved) : INITIAL_SHOPPING_LIST;
  });

  const [currentLang, setCurrentLang] = useState('en-US');
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [toast, setToast] = useState(null);

  // Active Modals state ('whySneek' | 'faq' | 'contact' | null)
  const [activeModal, setActiveModal] = useState(null);

  // Search Modal State
  const [searchModal, setSearchModal] = useState({
    isOpen: false,
    query: '',
    categoryFilter: null,
    minPrice: 0,
    maxPrice: 20,
    organicOnly: false
  });

  useEffect(() => {
    localStorage.setItem('voice_shopping_list', JSON.stringify(shoppingList));
  }, [shoppingList]);

  // Audio Feedback TTS
  const triggerAudioAndToast = (message, type = 'info', speechText = null) => {
    setToast({ message, type, id: Date.now() });
    voiceService.speak(speechText || message);
  };

  // Execute NLP Command Action
  const executeCommand = useCallback((rawText) => {
    setTranscript(rawText);
    setInterimTranscript('');

    const parsed = parseVoiceCommand(rawText, currentLang);
    console.log('NLP Parsed Result:', parsed);

    switch (parsed.intent) {
      case 'ADD_ITEM': {
        const { itemName, quantity, maxPrice, category, isOrganic } = parsed;
        const catalogMatch = findBestCatalogMatch(MOCK_CATALOG, itemName, maxPrice);

        // Catalog Guard: If item is not in store catalog, do NOT add dummy junk! Open search modal instead.
        if (!catalogMatch) {
          setSearchModal({
            isOpen: true,
            query: itemName || '',
            maxPrice: maxPrice || 20,
            organicOnly: isOrganic || false
          });
          triggerAudioAndToast(
            `No catalog item matching "${itemName}". Showing available marketplace products...`,
            'info',
            `No catalog item matching ${itemName}. Showing available options.`
          );
          break;
        }

        const finalName = catalogMatch.name;
        const finalCategory = catalogMatch.category;
        const finalPrice = catalogMatch.price;
        const finalUnit = catalogMatch.unit;

        // Check if item already exists in list (using exact match so Almond Milk doesn't collide with Whole Milk)
        setShoppingList(prev => {
          const existingMatch = findExactShoppingListItem(prev, finalName);
          if (existingMatch) {
            return prev.map(item => item.id === existingMatch.id ? { ...item, quantity: item.quantity + quantity } : item);
          } else {
            return [
              ...prev,
              {
                id: `item-${Date.now()}`,
                name: finalName,
                category: finalCategory,
                quantity: quantity,
                price: finalPrice,
                unit: finalUnit,
                completed: false,
                addedVia: 'voice'
              }
            ];
          }
        });

        triggerAudioAndToast(
          `Added ${quantity}x ${finalName} to ${finalCategory}`,
          'success',
          `Added ${quantity} ${finalName} to your shopping list`
        );

        // Check for smart substitute recommendations
        const substitutes = getSubstitutesForItem(finalName);
        if (substitutes.length > 0) {
          setTimeout(() => {
            setToast({
              message: `Smart Swap Idea: Switch ${finalName} to ${substitutes[0].name}?`,
              type: 'suggestion',
              id: Date.now()
            });
          }, 3500);
        }
        break;
      }

      case 'REMOVE_ITEM': {
        const { itemName, quantity, hasExplicitQuantity } = parsed;
        const target = findBestItemMatch(shoppingList, itemName);

        if (target) {
          if (hasExplicitQuantity && target.quantity > quantity) {
            const newQty = target.quantity - quantity;
            setShoppingList(prev => prev.map(item => item.id === target.id ? { ...item, quantity: newQty } : item));
            triggerAudioAndToast(
              `Reduced ${target.name} quantity by ${quantity} (now ${newQty})`,
              'info',
              `Reduced ${target.name} quantity to ${newQty}`
            );
          } else {
            setShoppingList(prev => prev.filter(item => item.id !== target.id));
            triggerAudioAndToast(
              `Removed ${target.name} from your list`,
              'info',
              `Removed ${target.name} from your shopping list`
            );
          }
        } else {
          triggerAudioAndToast(`Could not find "${itemName}" in your list`, 'error');
        }
        break;
      }

      case 'SEARCH_FILTER':
      case 'SEARCH_ITEM': {
        setSearchModal({
          isOpen: true,
          query: parsed.query || '',
          categoryFilter: parsed.categoryFilter || null,
          minPrice: parsed.minPrice || 0,
          maxPrice: parsed.maxPrice || 20,
          organicOnly: parsed.organicOnly || false
        });
        const categoryNotice = parsed.categoryFilter ? ` showing ${parsed.categoryFilter} options` : '';
        triggerAudioAndToast(
          `Searching catalog${categoryNotice}...`,
          'info',
          `Showing available options${parsed.categoryFilter ? ' in ' + parsed.categoryFilter : ''}. Click or speak to add.`
        );
        break;
      }

      case 'OPEN_CART': {
        setActiveModal('cart');
        const itemCount = shoppingList.reduce((sum, item) => sum + item.quantity, 0);
        const cartCost = shoppingList.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        triggerAudioAndToast(
          `Opened Cart (${itemCount} items, $${cartCost.toFixed(2)})`,
          'info',
          `Opening your shopping cart. You have ${itemCount} items totaling $${cartCost.toFixed(2)}.`
        );
        break;
      }

      case 'PLACE_ORDER': {
        setActiveModal('cart');
        triggerAudioAndToast(
          'Opening Cart to confirm your order',
          'success',
          'Opening cart to place your express order. Review items and confirm delivery.'
        );
        break;
      }

      case 'VOICE_HELP': {
        setActiveModal('faq');
        triggerAudioAndToast(
          'Voice Assistant Help',
          'info',
          'You can say commands like add 2 apples, find milk, open cart, or clear list.'
        );
        break;
      }

      case 'CLEAR_LIST': {
        setShoppingList([]);
        triggerAudioAndToast('Shopping list cleared', 'info', 'Your shopping list has been cleared');
        break;
      }

      default: {
        triggerAudioAndToast(`Unrecognized command: "${rawText}". Try "Add apples", "Open cart" or "Find milk"`, 'error');
        break;
      }
    }
  }, [currentLang, shoppingList]);

  // Handle Speech Recognition Toggle
  const handleToggleListen = () => {
    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
    } else {
      setTranscript('');
      setInterimTranscript('');
      const started = voiceService.startListening(
        (finalResult) => {
          setIsListening(false);
          executeCommand(finalResult);
        },
        (error) => {
          setIsListening(false);
          console.warn('Voice recognition error:', error);
          if (error === 'SPEECH_NOT_SUPPORTED') {
            triggerAudioAndToast('Web Speech API not supported in this browser', 'error');
          }
        },
        () => setIsListening(false),
        (interim) => setInterimTranscript(interim)
      );

      if (started) {
        setIsListening(true);
      }
    }
  };

  // Language Change
  const handleLangChange = (langCode) => {
    setCurrentLang(langCode);
    voiceService.setLanguage(langCode);
    triggerAudioAndToast(`Switched voice recognition language to ${langCode}`, 'info');
  };

  // Mute Toggle
  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    voiceService.setMuted(nextMuted);
  };

  // List Item Actions
  const handleToggleComplete = (id) => {
    setShoppingList(prev => prev.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleDeleteItem(id);
      return;
    }
    setShoppingList(prev => prev.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const handleDeleteItem = (id) => {
    setShoppingList(prev => prev.filter(item => item.id !== id));
  };

  const handleClearList = () => {
    if (window.confirm('Are you sure you want to clear all items in your shopping list?')) {
      setShoppingList([]);
      triggerAudioAndToast('Cleared shopping list', 'info');
    }
  };

  const handleAddSuggestion = (name, category, price, unit = 'each') => {
    setShoppingList(prev => {
      const existingMatch = findExactShoppingListItem(prev, name);
      if (existingMatch) {
        return prev.map(item => item.id === existingMatch.id ? { ...item, quantity: item.quantity + 1 } : item);
      } else {
        return [
          ...prev,
          {
            id: `item-${Date.now()}`,
            name,
            category: category || detectCategory(name),
            quantity: 1,
            price: price || 2.99,
            unit: unit || 'each',
            completed: false,
            addedVia: 'suggestion'
          }
        ];
      }
    });
    triggerAudioAndToast(`Added ${name} to list`, 'success');
  };

  const totalCost = shoppingList.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = shoppingList.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 20px 60px' }}>
      {/* Sneek Top Navigation Header */}
      <Navbar
        currentLang={currentLang}
        onLangChange={handleLangChange}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        onOpenSearch={() => setSearchModal({ isOpen: true, query: '', maxPrice: 5, organicOnly: false })}
        totalItems={totalItems}
        totalCost={totalCost}
        onOpenModal={(modalName) => setActiveModal(modalName)}
      />

      {/* Sneek Hero Section */}
      <HeroBanner
        isListening={isListening}
        onToggleListen={handleToggleListen}
        transcript={transcript}
        interimTranscript={interimTranscript}
        onRunSampleCommand={(sampleCmd) => executeCommand(sampleCmd)}
        hasSpeechSupport={voiceService.hasRecognition}
        onOpenSearch={() => setSearchModal({ isOpen: true, query: '', maxPrice: 5, organicOnly: false })}
        currentLang={currentLang}
      />

      {/* Sneek Marketplace Product Catalog Grid */}
      <ProductGrid
        onAddProduct={(name, cat, price, unit) => handleAddSuggestion(name, cat, price, unit)}
      />

      {/* Shopping List & Smart Suggestions Layout */}
      <main style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <ShoppingList
          items={shoppingList}
          onToggleComplete={handleToggleComplete}
          onUpdateQuantity={handleUpdateQuantity}
          onDeleteItem={handleDeleteItem}
          onClearList={handleClearList}
          onAddSampleItem={(name, cat) => handleAddSuggestion(name, cat, 2.99)}
        />

        <SmartSuggestions
          shoppingList={shoppingList}
          onAddSuggestion={handleAddSuggestion}
        />
      </main>

      {/* Fallback Natural Language Text Input Console */}
      <QuickManualInput onSubmitCommand={(cmd) => executeCommand(cmd)} />

      {/* Voice Search Modal */}
      <VoiceSearchModal
        isOpen={searchModal.isOpen}
        onClose={() => setSearchModal(prev => ({ ...prev, isOpen: false }))}
        initialQuery={searchModal.query}
        initialCategory={searchModal.categoryFilter}
        initialMinPrice={searchModal.minPrice}
        initialMaxPrice={searchModal.maxPrice}
        initialOrganicOnly={searchModal.organicOnly}
        onAddToList={(name, cat, price, unit) => handleAddSuggestion(name, cat, price, unit)}
        isListening={isListening}
        onStartVoiceSearch={handleToggleListen}
      />

      {/* Interactive Navigation & Checkout Modals */}
      <CartModal
        isOpen={activeModal === 'cart'}
        onClose={() => setActiveModal(null)}
        items={shoppingList}
        onUpdateQuantity={handleUpdateQuantity}
        onDeleteItem={handleDeleteItem}
        onClearList={() => setShoppingList([])}
        triggerAudioAndToast={triggerAudioAndToast}
      />

      <WhySneekModal
        isOpen={activeModal === 'whySneek'}
        onClose={() => setActiveModal(null)}
      />

      <FAQModal
        isOpen={activeModal === 'faq'}
        onClose={() => setActiveModal(null)}
      />

      <ContactModal
        isOpen={activeModal === 'contact'}
        onClose={() => setActiveModal(null)}
        onSubmitSuccess={(msg) => triggerAudioAndToast(msg, 'success')}
      />

      {/* Floating Mobile / Voice-Only Bottom Action Controller */}
      <FloatingVoiceController
        isListening={isListening}
        onToggleListen={handleToggleListen}
        totalItems={totalItems}
        totalCost={totalCost}
        onOpenCart={() => setActiveModal('cart')}
        onOpenSearch={() => setSearchModal({ isOpen: true, query: '', maxPrice: 5, organicOnly: false })}
        onOpenHelp={() => setActiveModal('faq')}
        interimTranscript={interimTranscript}
        currentLang={currentLang}
        onLangChange={handleLangChange}
      />

      {/* Toast Notification Bar */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
