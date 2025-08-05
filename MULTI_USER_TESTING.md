# Multi-User Testing Guide

## 🎯 **How to Test with Multiple Users**

The app now generates different users for each session/browser. Here's how to test:

### **Method 1: Multiple Browser Tabs (Easiest)**
1. **Open 3-4 browser tabs** to http://localhost:5173
2. **Login in each tab** - you'll get different users (Alice, Bob, Charlie, etc.)
3. **Join the same room** in all tabs
4. **Send messages** from different tabs
5. **Watch real-time updates** across all tabs

### **Method 2: Different Browsers**
- **Chrome**: http://localhost:5173 → Alice
- **Firefox**: http://localhost:5173 → Bob  
- **Safari**: http://localhost:5173 → Charlie
- **Edge**: http://localhost:5173 → Diana

### **Method 3: Incognito/Private Windows**
- **Regular Chrome**: http://localhost:5173 → Eve
- **Incognito Chrome**: http://localhost:5173 → Frank
- **Regular Firefox**: http://localhost:5173 → Grace
- **Private Firefox**: http://localhost:5173 → Henry

## 🎭 **Available Test Users**

The app will randomly assign one of these users:
- **Alice** (alice@example.com) - Blue avatar with "A"
- **Bob** (bob@example.com) - Blue avatar with "B"
- **Charlie** (charlie@example.com) - Blue avatar with "C"
- **Diana** (diana@example.com) - Blue avatar with "D"
- **Eve** (eve@example.com) - Blue avatar with "E"
- **Frank** (frank@example.com) - Blue avatar with "F"
- **Grace** (grace@example.com) - Blue avatar with "G"
- **Henry** (henry@example.com) - Blue avatar with "H"

## 🧪 **Testing Scenarios**

### **Real-time Messaging**
1. Open 3 tabs with different users
2. Join the same room in all tabs
3. Send messages from each tab
4. Verify messages appear in real-time across all tabs

### **Typing Indicators**
1. Start typing in one tab
2. Watch for typing indicators in other tabs
3. Stop typing and verify indicators disappear

### **Online User Tracking**
1. Check the "X online" counter in room headers
2. Open/close tabs to see count change
3. Verify user list updates

### **Room Management**
1. Create a new room from one user
2. Join the room from other users
3. Send messages in the new room
4. Verify isolated message history per room

## 🎊 **Expected Results**

✅ **Different user names** in each browser/tab  
✅ **Unique message bubbles** (your messages on right, others on left)  
✅ **Real-time message delivery** across all sessions  
✅ **Typing indicators** when others are typing  
✅ **Online user count** updates dynamically  
✅ **Room isolation** - messages stay in their respective rooms  

## 🚀 **Quick Test**

1. **Tab 1**: Open http://localhost:5173 → Login → Join "Test" room
2. **Tab 2**: Open http://localhost:5173 → Login → Join "Test" room  
3. **Tab 1**: Send "Hello from Alice!"
4. **Tab 2**: Send "Hi from Bob!"
5. **Watch**: Messages appear in real-time with different user names!

**Enjoy testing your real-time chat application!** 🎉 