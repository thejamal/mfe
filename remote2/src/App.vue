<template>
  <div class="remote2-app">
    <div class="card">
      <div class="icon">🌟</div>
      <h1>Remote 2 - Vue App</h1>
      <p class="subtitle">This component is loaded from port 5002</p>
      
      <div class="interactive-section">
        <h2>Message Board</h2>
        <div class="input-group">
          <input 
            v-model="newMessage" 
            @keyup.enter="addMessage"
            placeholder="Type a message and press Enter..."
            class="message-input"
          />
          <button @click="addMessage" class="btn btn-primary">
            Add Message
          </button>
        </div>
        
        <div class="messages-container">
          <transition-group name="message-list">
            <div 
              v-for="(message, index) in messages" 
              :key="message.id"
              class="message-item"
            >
              <span class="message-text">{{ message.text }}</span>
              <button @click="removeMessage(index)" class="btn-remove">✕</button>
            </div>
          </transition-group>
          <p v-if="messages.length === 0" class="empty-state">
            No messages yet. Add one above! 👆
          </p>
        </div>
      </div>

      <div class="info-box">
        <h3>✨ Features</h3>
        <ul>
          <li>Built with Vue 3 Composition API</li>
          <li>Vite + Module Federation</li>
          <li>Cross-framework module loading</li>
          <li>Reactive state with animations</li>
        </ul>
      </div>

      <div class="stats">
        <div class="stat-item">
          <div class="stat-value">{{ messages.length }}</div>
          <div class="stat-label">Messages</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">{{ totalCharacters }}</div>
          <div class="stat-label">Characters</div>
        </div>
      </div>

      <div class="tech-stack">
        <span class="tech-tag">Vue 3</span>
        <span class="tech-tag">Vite</span>
        <span class="tech-tag">Module Federation</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const newMessage = ref('');
const messages = ref([]);
let messageId = 0;

const addMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push({
      id: messageId++,
      text: newMessage.value.trim()
    });
    newMessage.value = '';
  }
};

const removeMessage = (index) => {
  messages.value.splice(index, 1);
};

const totalCharacters = computed(() => {
  return messages.value.reduce((sum, msg) => sum + msg.text.length, 0);
});
</script>

<style scoped>
.remote2-app {
  padding: 2rem;
}

.card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

.icon {
  font-size: 4rem;
  text-align: center;
  margin-bottom: 1rem;
}

h1 {
  color: #1f2937;
  text-align: center;
  margin-bottom: 0.5rem;
  font-size: 2rem;
}

.subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 2rem;
  font-size: 1rem;
}

.interactive-section {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  color: white;
}

.interactive-section h2 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.input-group {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.message-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid white;
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  color: #1f2937;
}

.message-input::placeholder {
  color: #9ca3af;
}

.message-input:focus {
  outline: none;
  background: white;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.btn:active {
  transform: translateY(0);
}

.btn-primary {
  background: white;
  color: #11998e;
}

.btn-primary:hover {
  background: #f9fafb;
}

.messages-container {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  padding: 1rem;
  min-height: 150px;
  max-height: 300px;
  overflow-y: auto;
}

.message-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f3f4f6;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  color: #1f2937;
}

.message-text {
  flex: 1;
  word-break: break-word;
}

.btn-remove {
  background: #ef4444;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  flex-shrink: 0;
  margin-left: 0.5rem;
}

.btn-remove:hover {
  background: #dc2626;
}

.empty-state {
  text-align: center;
  color: #9ca3af;
  padding: 2rem;
  font-style: italic;
}

.message-list-enter-active,
.message-list-leave-active {
  transition: all 0.3s ease;
}

.message-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.message-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.info-box {
  background: #f9fafb;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.info-box h3 {
  color: #1f2937;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.info-box ul {
  list-style: none;
  padding: 0;
}

.info-box li {
  color: #4b5563;
  padding: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.info-box li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #10b981;
  font-weight: bold;
}

.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-item {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  color: white;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  opacity: 0.9;
}

.tech-stack {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.tech-tag {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}
</style>
