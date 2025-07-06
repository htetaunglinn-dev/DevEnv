const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: '.env.local' });

// Post schema - matching your TypeScript model
const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['general', 'news', 'tutorial', 'lifestyle', 'technology', 'other'],
    default: 'general'
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  views: {
    type: Number,
    default: 0,
    min: 0
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

const Post = mongoose.model('Post', PostSchema);

// User schema
const UserSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  isEmailVerified: { type: Boolean, default: true }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

// Dummy posts data from your client
const dummyPosts = [
  {
    title: "AI becomes world leading technology in 2023",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    category: "technology",
    tags: ["ai", "technology", "2023"],
    content: "Artificial Intelligence has revolutionized the way we think about technology. In 2023, AI has become the leading force in technological advancement, transforming industries from healthcare to finance. Machine learning algorithms are now more sophisticated than ever, enabling computers to learn and adapt in ways that were previously unimaginable. The impact of AI on our daily lives continues to grow, with smart assistants, autonomous vehicles, and intelligent recommendation systems becoming increasingly common. As we move forward, AI promises to unlock new possibilities and solve complex global challenges."
  },
  {
    title: "The benefits of listening to ebooks online",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
    category: "lifestyle",
    tags: ["ebooks", "reading", "online", "lifestyle"],
    content: "Online ebooks have transformed the way we consume literature and educational content. With the convenience of digital access, readers can enjoy their favorite books anywhere, anytime. Ebooks offer features like adjustable font sizes, built-in dictionaries, and search functionality that enhance the reading experience. The environmental benefits are significant too, as digital books eliminate the need for paper production. Many platforms also offer accessibility features for people with visual impairments, making literature more inclusive than ever before."
  },
  {
    title: "Digital marketing plays a vital role in business",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    category: "general",
    tags: ["digital marketing", "business", "online"],
    content: "In today's digital age, businesses cannot afford to ignore the power of digital marketing. From social media campaigns to search engine optimization, digital marketing strategies have become essential for reaching and engaging customers. The ability to track metrics in real-time allows businesses to optimize their campaigns for better ROI. Email marketing, content marketing, and pay-per-click advertising are just a few of the tools that modern businesses use to build their brand and drive sales in the digital marketplace."
  },
  {
    title: "How to control your anger - Emotional Management",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    category: "lifestyle",
    tags: ["anger management", "emotions", "wellness", "mental health"],
    content: "Anger is a natural human emotion, but learning to manage it effectively is crucial for personal and professional relationships. Techniques such as deep breathing, mindfulness meditation, and cognitive restructuring can help individuals respond to triggering situations more calmly. Regular exercise and adequate sleep also play important roles in emotional regulation. Understanding the root causes of anger and developing healthy coping strategies can lead to improved mental health and stronger relationships with others."
  },
  {
    title: "Cryptocurrency is the future - Bitcoin was the first stable crypto currency",
    imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800&h=600&fit=crop",
    category: "technology",
    tags: ["cryptocurrency", "bitcoin", "blockchain", "finance"],
    content: "Bitcoin pioneered the cryptocurrency revolution, introducing the world to decentralized digital currency. Since its inception, Bitcoin has proven to be a stable and reliable store of value, despite market volatility. The underlying blockchain technology has applications far beyond currency, including smart contracts, supply chain management, and digital identity verification. As more institutions adopt cryptocurrency, we're seeing a fundamental shift in how we think about money and financial transactions."
  },
  {
    title: "What is the future of digital marketing - AI or Human?",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    category: "technology",
    tags: ["digital marketing", "ai", "automation", "future"],
    content: "The future of digital marketing lies in the synergy between AI automation and human creativity. While AI excels at data analysis, personalization, and campaign optimization, humans bring emotional intelligence, creative thinking, and strategic vision. AI can process vast amounts of customer data to identify patterns and predict behaviors, but humans are needed to interpret these insights and create compelling, authentic marketing messages that resonate with audiences on an emotional level."
  },
  {
    title: "Music industry is skyrocketing in 2023",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
    category: "other",
    tags: ["music", "industry", "2023", "streaming"],
    content: "The music industry has experienced unprecedented growth in 2023, driven largely by streaming platforms and digital distribution. Artists now have more ways than ever to reach their audiences directly, bypassing traditional gatekeepers. Social media platforms like TikTok have become powerful discovery engines for new music, while NFTs and blockchain technology are creating new revenue streams for musicians. The democratization of music production tools has also enabled more artists to create professional-quality recordings from home studios."
  },
  {
    title: "Why Google is the top 1 tech company in the world",
    imageUrl: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&h=600&fit=crop",
    category: "technology",
    tags: ["google", "tech company", "innovation", "search"],
    content: "Google's dominance in the tech industry stems from its innovative approach to organizing and accessing information. From its revolutionary search algorithm to its comprehensive suite of productivity tools, Google has consistently delivered solutions that improve how people work and communicate. The company's investments in artificial intelligence, cloud computing, and mobile technology have positioned it at the forefront of digital transformation. Google's commitment to open-source development and its vast ecosystem of services continue to drive innovation across the tech industry."
  },
  {
    title: "World wide web is growing day by day - How does it work?",
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    category: "technology",
    tags: ["web", "internet", "technology", "growth"],
    content: "The World Wide Web continues to expand at an exponential rate, connecting billions of people and devices across the globe. At its core, the web operates through a system of interconnected servers, protocols, and standards that enable seamless information sharing. HTML, CSS, and JavaScript form the foundation of web pages, while HTTP and HTTPS protocols facilitate secure data transmission. The evolution from static websites to dynamic, interactive web applications has transformed how we work, learn, and communicate in the digital age."
  },
  {
    title: "iPhone 15 is launched in October, 2023 - What are the new features",
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop",
    category: "technology",
    tags: ["iphone", "apple", "smartphone", "features"],
    content: "The iPhone 15 represents Apple's latest innovation in smartphone technology, featuring significant improvements in camera quality, battery life, and processing power. The new A17 chip delivers enhanced performance while maintaining energy efficiency. The camera system includes advanced computational photography features, improved low-light performance, and enhanced video stabilization. Additional features include faster charging capabilities, improved durability, and new accessibility options that make the device more inclusive for users with disabilities."
  },
  {
    title: "The future of digital payment and ecommerce in 2023",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
    category: "technology",
    tags: ["digital payment", "ecommerce", "fintech", "future"],
    content: "Digital payments and ecommerce are evolving rapidly, with new technologies making transactions more secure, convenient, and accessible. Contactless payments, mobile wallets, and buy-now-pay-later services are reshaping consumer behavior. Blockchain technology and cryptocurrencies are introducing new possibilities for cross-border transactions and financial inclusion. As augmented reality and virtual reality technologies mature, we can expect more immersive shopping experiences that blur the lines between online and offline commerce."
  },
  {
    title: "2023 trending tech news - What are the top 5 tech news of 2023?",
    imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop",
    category: "news",
    tags: ["tech news", "2023", "trends", "technology"],
    content: "2023 has been a landmark year for technology with several groundbreaking developments. The rise of generative AI has captured global attention, with tools like ChatGPT and DALL-E transforming creative industries. The metaverse concept continues to evolve with improved VR and AR technologies. Quantum computing has achieved new milestones, bringing us closer to practical applications. Sustainable technology has gained momentum with advances in renewable energy and green computing. Finally, the rollout of 5G networks has accelerated, enabling new possibilities in IoT and edge computing."
  },
  {
    title: "What is the most exciting tech news of 2023",
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop",
    category: "news",
    tags: ["exciting", "tech news", "innovation", "2023"],
    content: "Among all the technological breakthroughs of 2023, the democratization of artificial intelligence stands out as the most exciting development. The release of user-friendly AI tools has empowered individuals and small businesses to leverage advanced technology previously available only to large corporations. From automated content creation to intelligent data analysis, AI is no longer confined to research labs but is actively improving productivity and creativity across all sectors of society."
  },
  {
    title: "How ChatGPT helps human beings - Advantages and disadvantages",
    imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800&h=600&fit=crop",
    category: "technology",
    tags: ["chatgpt", "ai", "advantages", "disadvantages"],
    content: "ChatGPT has revolutionized how we interact with artificial intelligence, offering numerous benefits including instant access to information, writing assistance, and problem-solving support. It can help with education, productivity, and creative tasks, making complex information more accessible. However, challenges include potential misinformation, over-reliance on AI for critical thinking, and concerns about privacy and data security. The key is to use ChatGPT as a tool to augment human capabilities rather than replace human judgment and expertise."
  },
  {
    title: "Landscape photographer - the best gear sets in 2023",
    imageUrl: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&h=600&fit=crop",
    category: "lifestyle",
    tags: ["photography", "landscape", "gear", "equipment"],
    content: "Landscape photography requires specialized equipment to capture the beauty of natural environments. In 2023, the best gear includes full-frame mirrorless cameras with excellent dynamic range, weather-sealed lenses ranging from ultra-wide to telephoto, and sturdy carbon fiber tripods for stability. Essential accessories include polarizing filters to manage reflections, neutral density filters for long exposures, and backup batteries for extended shooting sessions. Modern photographers also benefit from advanced post-processing software that helps bring out the full potential of their captured images."
  }
];

async function seedDummyPosts() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/your-app-name";
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing posts
    await Post.deleteMany({});
    console.log('🗑️ Cleared existing posts');

    // Create a dummy user to be the author
    let author = await User.findOne({ email: 'dummy@example.com' });
    if (!author) {
      author = await User.create({
        email: 'dummy@example.com',
        firstName: 'Demo',
        lastName: 'Author',
        isEmailVerified: true
      });
      console.log('👤 Created dummy author');
    }

    // Create posts with the dummy author
    const postsToCreate = dummyPosts.map(post => ({
      ...post,
      author: author._id,
      status: 'published',
      views: Math.floor(Math.random() * 1000), // Random view count
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000) // Random date within last year
    }));

    const createdPosts = await Post.insertMany(postsToCreate);
    console.log(`✅ Successfully seeded ${createdPosts.length} posts to database`);

    // Close connection
    await mongoose.connection.close();
    console.log('🔐 Database connection closed');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seeder
seedDummyPosts();