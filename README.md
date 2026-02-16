# 🐝 Busy B - Social Media Application

A modern, full-stack social media application built with Next.js 14, Redux Toolkit, Firebase, and TypeScript. Features real-time updates, dark mode, authentication, and a beautiful Twitter-like UI.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-12.9.0-orange?style=for-the-badge&logo=firebase)
![Redux](https://img.shields.io/badge/Redux-2.11.2-purple?style=for-the-badge&logo=redux)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Redux Architecture](#-redux-architecture)
- [Workflows & Features](#-workflows--features)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Firebase Setup](#-firebase-setup)
- [Deployment](#-deployment)

---

## ✨ Features

### 🔐 **Authentication**
- ✅ User registration with email/password
- ✅ Secure login system
- ✅ Guest login functionality
- ✅ Persistent authentication state with Firebase
- ✅ Protected routes
- ✅ Separate login/signup pages

### 📝 **Posts & Feed**
- ✅ Create text posts
- ✅ Real-time feed updates (Firebase onSnapshot)
- ✅ Like/unlike posts with instant UI updates
- ✅ Comment on posts with reply modal
- ✅ Individual post pages with full comment threads
- ✅ Timestamp display ("2 minutes ago", "5 hours ago")
- ✅ Post deletion (for post owners)

### 🎨 **UI/UX**
- ✅ Beautiful Twitter-like interface
- ✅ Dark mode support with toggle button
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Loading states and spinners
- ✅ Error handling with user-friendly messages
- ✅ Gradient color scheme (Red to Pink)

### 🔍 **Search & Discovery**
- ✅ Real-time search functionality
- ✅ Search by post content, username, or name
- ✅ Debounced search (300ms delay)
- ✅ Dropdown search results with highlighting
- ✅ Trending topics widget
- ✅ "Who to follow" suggestions

### 😊 **Rich Text**
- ✅ Emoji picker integration
- ✅ Real-time emoji insertion
- ✅ Textarea auto-resize

### 🎯 **Additional Features**
- ✅ Notifications system (structure ready)
- ✅ User profile display in sidebar
- ✅ Post analytics display
- ✅ Share functionality (placeholder)
- ✅ Responsive sidebar navigation
- ✅ Bottom signup prompt for logged-out users
- ✅ Theme persistence

---

## 🛠 Tech Stack

### **Frontend**
- **Next.js 16.1.6** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Material-UI 7.3.7** - Modal components
- **Heroicons 2.2.0** - SVG icon library

### **State Management**
- **Redux Toolkit 2.11.2** - State management
- **React-Redux 9.2.0** - React bindings

### **Backend & Database**
- **Firebase 12.9.0**
  - Authentication (Email/Password)
  - Firestore (NoSQL real-time database)
  - Real-time listeners

### **Additional Libraries**
- **Moment.js 2.30.1** - Date formatting
- **Emoji Picker React 4.18.0** - Emoji selection
- **@emotion/react** - CSS-in-JS

---

## 🏗 Redux Architecture

### **State Slices Overview**

The application uses **7 Redux slices**:

| Slice | Purpose | Key Actions |
|-------|---------|-------------|
| **userSlice** | User authentication | `setUser`, `signOutUser` |
| **postsSlice** | Posts feed data | `setPosts`, `addPost`, `updatePost` |
| **modalSlice** | Modal controls | `openCommentModal`, `setCommentDetails` |
| **themeSlice** | Dark/Light mode | `toggleTheme`, `setTheme` |
| **loadingSlice** | Initial loading | `openLoadingScreen`, `closeLoadingScreen` |
| **notificationsSlice** | User notifications | `addNotification`, `markAsRead` |
| **searchSlice** | Search functionality | `setSearchQuery`, `setSearchResults` |

---

### **1. User Slice** (`userSlice.ts`)

Manages authentication state and user information.

```typescript
interface UserState {
  uid: string;
  email: string;
  name: string;
  username: string;
  photoUrl: string;
}

// Actions
setUser(userData)    // Store authenticated user
signOutUser()        // Clear user state on logout
```

**Usage Example:**
```typescript
import { useSelector, useDispatch } from 'react-redux';
import { setUser, signOutUser } from '@/redux/slices/userSlice';

// Get current user
const user = useSelector((state: RootState) => state.user);

// Set user after login
dispatch(setUser({
  uid: 'user123',
  email: 'user@example.com',
  name: 'John Doe',
  username: 'johndoe',
  photoUrl: '/assets/profile-pic.png'
}));

// Sign out
dispatch(signOutUser());

// Conditional rendering
{user.username ? <Dashboard /> : <LoginPrompt />}
```

---

### **2. Posts Slice** (`postsSlice.ts`)

Manages the posts feed and individual post state.

```typescript
interface Post {
  id: string;
  name: string;
  username: string;
  text: string;
  timestamp: any;
  likes: string[];
  comments: any[];
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

// Actions
setPosts(posts)           // Set all posts
setPostsLoading(bool)     // Toggle loading state
addPost(post)             // Add new post to feed
updatePost(post)          // Update existing post
deletePost(id)            // Remove post
```

**Usage Example:**
```typescript
import { useSelector } from 'react-redux';
import { setPosts } from '@/redux/slices/postsSlice';

// Get posts and loading state
const { posts, loading } = useSelector((state: RootState) => state.posts);

// Update posts from Firebase
useEffect(() => {
  const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
    const postsData = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    dispatch(setPosts(postsData));
  });
  return () => unsubscribe();
}, []);

// Render posts
{loading ? (
  <Spinner />
) : (
  posts.map(post => <Post key={post.id} {...post} />)
)}
```

---

### **3. Modal Slice** (`modalSlice.ts`)

Controls modal visibility and associated data.

```typescript
interface ModalState {
  commentModalOpen: boolean;
  commentDetails: {
    id: string;
    name: string;
    username: string;
    text: string;
    timestamp: any;
  } | null;
}

// Actions
openCommentModal()           // Open reply modal
closeCommentModal()          // Close modal
setCommentDetails(details)   // Set post being replied to
```

**Usage Example:**
```typescript
import { useDispatch } from 'react-redux';
import { setCommentDetails } from '@/redux/slices/modalSlice';

// Open comment modal with post context
const handleComment = (post) => {
  dispatch(setCommentDetails({
    id: post.id,
    name: post.name,
    username: post.username,
    text: post.text,
    timestamp: post.timestamp
  }));
};

// In CommentModal component
const commentDetails = useSelector(
  (state: RootState) => state.modals.commentDetails
);

{commentDetails && (
  <div>
    <p>Replying to @{commentDetails.username}</p>
    <PostInput insideModal={true} />
  </div>
)}
```

---

### **4. Theme Slice** (`themeSlice.ts`)

Manages light/dark mode theme.

```typescript
interface ThemeState {
  theme: 'light' | 'dark';
}

// Actions
toggleTheme()        // Switch between light and dark
setTheme(theme)      // Set specific theme
```

**Usage Example:**
```typescript
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '@/redux/slices/themeSlice';

// Get current theme
const theme = useSelector((state: RootState) => state.theme.theme);

// Toggle theme
const handleToggle = () => {
  dispatch(toggleTheme());
};

// Theme toggle button
<button onClick={handleToggle}>
  {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
</button>

// ThemeProvider listens to theme changes
useEffect(() => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [theme]);
```

---

### **5. Loading Slice** (`loadingSlice.ts`)

Controls the initial app loading screen.

```typescript
interface LoadingState {
  loadingScreenOpen: boolean;
}

// Actions
openLoadingScreen()      // Show loading screen
closeLoadingScreen()     // Hide loading screen
```

**Usage Example:**
```typescript
// In LoadingScreen component
const isOpen = useSelector(
  (state: RootState) => state.loading.loadingScreenOpen
);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(setUser(userData));
    }
    setTimeout(() => {
      dispatch(closeLoadingScreen());
    }, 1000);
  });
  return () => unsubscribe();
}, []);

if (!isOpen) return null;
return <div>Loading...</div>;
```

---

### **6. Search Slice** (`searchSlice.ts`)

Manages search functionality.

```typescript
interface SearchState {
  query: string;
  filter: 'all' | 'posts' | 'users' | 'media';
  results: any[];
  loading: boolean;
}

// Actions
setSearchQuery(query)         // Store search term
setSearchFilter(filter)       // Set filter type
setSearchResults(results)     // Store search results
setSearchLoading(bool)        // Toggle loading
clearSearch()                 // Reset search
```

**Usage Example:**
```typescript
import { setSearchQuery, setSearchResults } from '@/redux/slices/searchSlice';

// Debounced search
useEffect(() => {
  if (query.length < 2) return;
  
  const timer = setTimeout(() => {
    dispatch(setSearchLoading(true));
    // Perform search
    const results = posts.filter(post => 
      post.text.includes(query)
    );
    dispatch(setSearchResults(results));
  }, 300);
  
  return () => clearTimeout(timer);
}, [query]);
```

---

## 🔄 Workflows & Features

### **1. Authentication Workflow**

```
User Opens App
    ↓
LoadingScreen Component
    ├─ Checks Firebase auth state
    ├─ onAuthStateChanged() listener
    └─ dispatch(setUser()) if logged in
    ↓
[Logged In?]
    ├─ YES → dispatch(closeLoadingScreen())
    │        → Show Home Feed
    │        → User info in Sidebar
    │
    └─ NO  → dispatch(closeLoadingScreen())
             → Show SignupPrompt at bottom
             → Click "Login" → /login page
             → Click "Sign up" → /signup page
             → After auth → dispatch(setUser())
             → Redirect to home
```

**Redux Flow:**
```typescript
// 1. Initial load
dispatch(openLoadingScreen());

// 2. Check auth
onAuthStateChanged(auth, (currentUser) => {
  if (currentUser) {
    dispatch(setUser({
      uid: currentUser.uid,
      email: currentUser.email,
      name: currentUser.displayName,
      username: currentUser.email.split('@')[0],
      photoUrl: currentUser.photoURL
    }));
  }
  dispatch(closeLoadingScreen());
});

// 3. Sign out
await signOut(auth);
dispatch(signOutUser());
```

---

### **2. Create Post Workflow**

```
User types in PostInput
    ↓
Check if authenticated
    ├─ if (!user.username)
    │  → router.push('/login')
    │
    └─ if (user.username)
       ↓
    Click "Post" button
       ↓
    Validate text not empty
       ↓
    Firebase: addDoc(collection(db, 'posts'), {
      name: user.name,
      username: user.username,
      text: text,
      timestamp: serverTimestamp(),
      likes: [],
      comments: []
    })
       ↓
    Real-time listener triggers
       ↓
    dispatch(setPosts(updatedPosts))
       ↓
    Post appears in feed instantly
```

**Redux Flow:**
```typescript
// Check auth before posting
const user = useSelector((state: RootState) => state.user);

if (!user.username) {
  router.push('/login');
  return;
}

// Create post
await addDoc(collection(db, 'posts'), {
  name: user.name,
  username: user.username,
  text: text,
  timestamp: serverTimestamp(),
  likes: [],
  comments: []
});

// Real-time listener automatically updates Redux
onSnapshot(postsQuery, (snapshot) => {
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  dispatch(setPosts(posts));
});
```

---

### **3. Like/Unlike Workflow**

```
User clicks Heart icon on post
    ↓
Check authentication
    ├─ if (!user.username) → redirect to /login
    │
    └─ if (user.username)
       ↓
    Check if already liked
    ├─ isLiked = post.likes.includes(user.uid)
    │
    ├─ If YES (unlike):
    │  → updateDoc(postRef, {
    │      likes: arrayRemove(user.uid)
    │    })
    │
    └─ If NO (like):
       → updateDoc(postRef, {
           likes: arrayUnion(user.uid)
         })
    ↓
Real-time listener updates post
    ↓
UI re-renders with new like count
```

**Redux Flow:**
```typescript
const user = useSelector((state: RootState) => state.user);
const isLiked = post.likes.includes(user.uid);

const likePost = async () => {
  if (!user.username) {
    router.push('/login');
    return;
  }

  const postRef = doc(db, 'posts', post.id);
  
  if (isLiked) {
    await updateDoc(postRef, {
      likes: arrayRemove(user.uid)
    });
  } else {
    await updateDoc(postRef, {
      likes: arrayUnion(user.uid)
    });
  }
  // Real-time listener handles Redux update
};
```

---

### **4. Comment Workflow**

```
User clicks Comment icon
    ↓
Check authentication
    ├─ if (!user.username) → redirect to /login
    │
    └─ if (user.username)
       ↓
    dispatch(setCommentDetails({
      id, name, username, text, timestamp
    }))
       ↓
    CommentModal opens
    ├─ Shows original post
    └─ Shows reply input (PostInput insideModal={true})
       ↓
    User types reply
       ↓
    Click "Reply" button
       ↓
    Firebase: updateDoc(postRef, {
      comments: arrayUnion({
        name, username, comment, timestamp
      })
    })
       ↓
    dispatch(closeCommentModal())
       ↓
    Real-time listener updates post
       ↓
    Comment appears in post's comment thread
```

**Redux Flow:**
```typescript
// 1. Open comment modal
const handleComment = (post) => {
  if (!user.username) {
    router.push('/login');
    return;
  }
  
  dispatch(setCommentDetails({
    id: post.id,
    name: post.name,
    username: post.username,
    text: post.text,
    timestamp: post.timestamp
  }));
};

// 2. In CommentModal
const commentDetails = useSelector(
  (state: RootState) => state.modals.commentDetails
);

// 3. Submit reply
const postRef = doc(db, 'posts', commentDetails.id);
await updateDoc(postRef, {
  comments: arrayUnion({
    name: user.name,
    username: user.username,
    comment: replyText,
    timestamp: new Date()
  })
});

dispatch(closeCommentModal());
```

---

### **5. Search Workflow**

```
User types in SearchBar
    ↓
dispatch(setSearchQuery(query))
    ↓
Debounce 300ms
    ↓
dispatch(setSearchLoading(true))
    ↓
Firebase: getDocs(postsRef)
    ↓
Filter posts client-side
    ├─ by post.text
    ├─ by post.name
    └─ by post.username
    ↓
dispatch(setSearchResults(filteredPosts))
    ↓
Show dropdown with results
    ↓
User clicks result
    ↓
router.push(`/${postId}`)
    ↓
dispatch(clearSearch())
```

**Redux Flow:**
```typescript
const dispatch = useDispatch();
const [query, setQuery] = useState('');

// Debounced search
useEffect(() => {
  if (query.length < 2) {
    dispatch(setSearchResults([]));
    return;
  }

  const timer = setTimeout(async () => {
    dispatch(setSearchLoading(true));
    
    const snapshot = await getDocs(collection(db, 'posts'));
    const filtered = snapshot.docs
      .filter(doc => {
        const data = doc.data();
        return data.text?.includes(query) ||
               data.name?.includes(query) ||
               data.username?.includes(query);
      })
      .map(doc => ({ id: doc.id, ...doc.data() }));
    
    dispatch(setSearchResults(filtered));
  }, 300);

  return () => clearTimeout(timer);
}, [query]);
```

---

### **6. Theme Toggle Workflow**

```
User clicks Theme Toggle Button (🌙/☀️)
    ↓
dispatch(toggleTheme())
    ├─ if theme === 'light' → theme = 'dark'
    └─ if theme === 'dark' → theme = 'light'
    ↓
ThemeProvider useEffect() triggered
    ├─ Watches state.theme
    └─ Updates document.documentElement
       ↓
    if (theme === 'dark')
      document.documentElement.classList.add('dark')
    else
      document.documentElement.classList.remove('dark')
       ↓
Tailwind dark: classes activate
    ↓
UI updates instantly across entire app
```

**Redux Flow:**
```typescript
// ThemeToggle Button
const theme = useSelector((state: RootState) => state.theme.theme);
const dispatch = useDispatch();

<button onClick={() => dispatch(toggleTheme())}>
  {theme === 'light' ? '🌙' : '☀️'}
</button>

// ThemeProvider Component
const theme = useSelector((state: RootState) => state.theme.theme);

useEffect(() => {
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
}, [theme]);
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js 18+
- npm or yarn
- Firebase account

### **Installation**

```bash
# 1. Clone repository
git clone <your-repo-url>
cd blog-nextjs

# 2. Install dependencies
npm install

# 3. Create .env.local file
cp .env.local.example .env.local
# Add your Firebase credentials

# 4. Add assets
# Place profile-pic.png in public/assets/

# 5. Run development server
npm run dev

# 6. Open browser
# Navigate to http://localhost:3000
```

---

## 📁 Project Structure

```
blog-nextjs/
├── app/
│   ├── [id]/page.tsx          # Individual post page
│   ├── login/page.tsx         # Login page
│   ├── signup/page.tsx        # Signup page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home feed
│   └── globals.css            # Global styles
├── components/
│   ├── modals/
│   │   └── CommentModal.tsx   # Reply modal
│   ├── LoadingScreen.tsx
│   ├── Post.tsx               # Post card
│   ├── PostFeed.tsx           # Feed container
│   ├── PostHeader.tsx
│   ├── PostInput.tsx          # Create post
│   ├── SearchBar.tsx
│   ├── Sidebar.tsx
│   ├── SignupPrompt.tsx
│   ├── ThemeProvider.tsx
│   ├── ThemeToggle.tsx
│   ├── UserInfo.tsx
│   └── Widgets.tsx
├── redux/
│   ├── slices/
│   │   ├── loadingSlice.ts
│   │   ├── modalSlice.ts
│   │   ├── notificationsSlice.ts
│   │   ├── postsSlice.ts
│   │   ├── searchSlice.ts
│   │   ├── themeSlice.ts
│   │   └── userSlice.ts
│   ├── store.ts
│   └── StoreProvider.tsx
├── firebase.ts
├── package.json
└── tsconfig.json
```

---

## 🔥 Firebase Setup

1. Create Firebase project
2. Enable Email/Password authentication
3. Create Firestore database (test mode)
4. Get Firebase config
5. Add to `.env.local`
6. Create guest account (optional)

---

## 🚢 Deployment

### **Vercel** (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### **Build Locally**
```bash
npm run build
npm run start
```

---

**⭐ Star this repo if you found it helpful!**
