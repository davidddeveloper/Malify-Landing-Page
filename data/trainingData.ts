
const TrainingData = () => {
    const trainingData = [
        {
          text_input: "Subject: Your Amazon Order has Shipped\nFrom: Amazon no-reply@amazon.com\n\nHi David, \n\nYour order #1234567890 has shipped and is on its way! Track your package using the tracking number below:\n\nTracking Number: 1Z999AA10123456784\n\nEstimated Delivery: 2-3 days.\n\nThanks for shopping with Amazon!\n",
          output: "📦 Your Amazon order #1234567890 has shipped! \n📍 Track your package with tracking number: 1Z999AA10123456784. \n📅 Estimated delivery in 2-3 days."
        },
        {
          text_input: "Subject: Your LinkedIn Job Alert: New Software Engineer Roles\nFrom: LinkedIn Jobs jobs-noreply@linkedin.com\n\nHello David, \n\nYou have new job alerts for Software Engineer positions:\n\n1. Software Engineer at XYZ Tech - Apply before March 10th.\n2. Full-Stack Developer at ABC Corp - Apply before March 15th.\n\nClick the links to apply or save them for later.\n\nBest regards, \nLinkedIn Jobs Team",
          output: "💼 New Software Engineer job alerts: \n1️⃣ Software Engineer at XYZ Tech (Apply by Mar 10th) \n2️⃣ Full-Stack Developer at ABC Corp (Apply by Mar 15th) \n🔗 Click to apply or save for later."
        },
        {
          text_input: "Subject: David, your Coursera course is expiring soon!\nFrom: Coursera notifications@coursera.org\n\nHi David,\n\nYour course 'Advanced Python Programming' on Coursera is expiring soon on March 1st. Complete the remaining lessons to receive your certificate.\n\nDon't miss out on completing your course!\n\nThanks, \nCoursera Team",
          output: "⏰ Your Coursera course 'Advanced Python Programming' expires on Mar 1st. \n🎓 Complete lessons for certification before the deadline!"
        },
        {
          text_input: "Subject: Your GitHub Security Alert ⚠️\nFrom: GitHub noreply@github.com\n\nHello David, \n\nA security vulnerability has been detected in one of your repositories. Please review the changes and update the repository settings to ensure security.\n\nRepository: project-x\n\nFor more details, click here to review and take action immediately.\n\nThanks, \nGitHub Security Team",
          output: "⚠️ Security alert for your GitHub repo 'project-x'. \n🔒 Review and update repository settings to fix the vulnerability!"
        },
        {
          text_input: "Subject: Welcome to OpenAI! Confirm your email\nFrom: OpenAI noreply@openai.com\n\nHi David, \n\nWelcome to OpenAI! To get started, please confirm your email address by clicking the link below.\n\n[Confirm Your Email]\n\nWe're excited to have you on board!\n\nBest regards, \nOpenAI Team",
          output: "🎉 Welcome to OpenAI, David! \n✅ Confirm your email by clicking here: [Confirm Your Email]"
        },
        {
          text_input: "Subject: [Netflix] Your monthly bill is ready\nFrom: Netflix billing@netflix.com\n\nHi David, \n\nYour Netflix monthly subscription has been billed for $14.99. The payment was successful.\n\nNext billing date: March 1st.\n\nThanks for being a Netflix member!\n\nBest, \nNetflix Billing Team",
          output: "💳 Your Netflix bill of $14.99 has been paid. \n📅 Next billing date: Mar 1st."
        },
        {
          text_input: "Subject: Password Reset Request\nFrom: Google no-reply@accounts.google.com\n\nHi David, \n\nWe received a request to reset your Google account password. If you did not request this, please ignore this email. If you wish to reset it, click the link below:\n\n[Reset Password Link]\n\nThe link expires in 30 minutes.\n\nBest regards, \nGoogle Support Team",
          output: "🔐 Password reset request for your Google account. \n⏳ Reset within 30 minutes by clicking here: [Reset Password Link]"
        },
        {
          text_input: "Subject: Your PayPal transaction has been completed\nFrom: PayPal service@paypal.com\n\nHi David, \n\nYour payment of $50.00 to John Doe has been successfully processed. The transaction ID is 9876543210.\n\nIf you have any questions or concerns, please visit PayPal's help center.\n\nThank you for using PayPal!\n\nBest regards, \nPayPal Team",
          output: "💰 Your PayPal payment of $50.00 to John Doe was successful. \n📄 Transaction ID: 9876543210."
        },
        {
          text_input: "Subject: Your DigitalOcean invoice for February 2025\nFrom: DigitalOcean billing@digitalocean.com\n\nHi David, \n\nYour invoice for DigitalOcean services in February 2025 is ready. The total amount due is $25.99.\n\nInvoice ID: DO20250223\n\nPlease make the payment by March 1st to avoid service interruptions.\n\nBest regards, \nDigitalOcean Billing Team",
          output: "💳 DigitalOcean invoice for Feb 2025 is $25.99. \n📅 Payment due by Mar 1st. Invoice ID: DO20250223."
        },
        {
          text_input: "Subject: Your appointment confirmation for March 5th\nFrom: Apple Support support@apple.com\n\nHi David, \n\nYour Apple Support appointment has been confirmed for March 5th at 2:00 PM.\n\nLocation: Apple Store, Downtown.\n\nPlease arrive 10 minutes before your scheduled time.\n\nBest regards, \nApple Support Team",
          output: "📅 Your Apple Support appointment is confirmed for Mar 5th, 2:00 PM. \n📍 Location: Apple Store, Downtown. Arrive 10 mins early."
        },
        {
          text_input: "Subject: 🚀 AI Breakthroughs This Week - OpenAI, Google DeepMind, & More\nFrom: The AI Insider newsletter@aiinsider.com\n\nHi David, \n\nHere are the top AI breakthroughs this week:\n1. OpenAI releases new GPT-4 model.\n2. Google DeepMind introduces AlphaFold 2.0 for protein folding.\n3. Researchers unveil a new AI-powered drug discovery tool.\n\nStay ahead of the curve with the latest AI trends.\n\nBest, \nThe AI Insider Team",
          output: "🚀 AI breakthroughs this week: \n1️⃣ OpenAI's GPT-4 model release. \n2️⃣ Google DeepMind's AlphaFold 2.0. \n3️⃣ New AI-powered drug discovery tool."
        },
        {
          text_input: "Subject: 📈 5 Stocks to Watch This Week\nFrom: Market Trends Digest news@markettrends.com\n\nHi David, \n\nHere are 5 stocks to keep an eye on this week:\n1. Tesla (TSLA)\n2. Amazon (AMZN)\n3. Apple (AAPL)\n4. Microsoft (MSFT)\n5. NVIDIA (NVDA)\n\nThese stocks are expected to show significant movement. Stay updated for market trends!\n\nBest regards, \nMarket Trends Digest Team",
          output: "📈 5 stocks to watch this week: \n1️⃣ Tesla (TSLA) \n2️⃣ Amazon (AMZN) \n3️⃣ Apple (AAPL) \n4️⃣ Microsoft (MSFT) \n5️⃣ NVIDIA (NVDA)"
        },
        {
          text_input: "Subject: The Python Weekly - New Libraries, Tutorials & Jobs!\nFrom: Python Weekly newsletter@pythonweekly.com\n\nHi David, \n\nCheck out the latest Python resources this week:\n1. New libraries for data science.\n2. Tutorials on Python web scraping.\n3. Python job listings for developers.\n\nStay ahead with the best Python content!\n\nBest, \nThe Python Weekly Team",
          output: "🐍 This week's Python highlights: \n1️⃣ New data science libraries. \n2️⃣ Python web scraping tutorials. \n3️⃣ Job listings for developers."
        },
        {
          text_input: "Subject: 🚀 How Startups Are Using AI for Growth\nFrom: YC Startup School updates@ycstartupschool.com\n\nHi David, \n\nHere's how startups are using AI to fuel growth:\n1. AI-driven customer support solutions.\n2. AI for predictive analytics in sales.\n3. AI-powered content generation for marketing.\n\nExplore how AI can help your startup thrive.\n\nBest, \nYC Startup School Team",
          output: "🚀 How startups are using AI for growth: \n1️⃣ AI-driven customer support. \n2️⃣ Predictive analytics in sales. \n3️⃣ AI-powered content generation."
        },




        // newsletter focused
        {
            "text_input": "Subject: 🧑‍💻 Top Tech Tools to Boost Your Productivity in 2025\nFrom: Tech Tools Weekly newsletter@techtips.com\n\nHi David, \n\nIn this week's edition, we cover the best productivity tools for tech professionals in 2025. Here are some to keep an eye on:\n\n1. AI-powered project management tools to streamline workflows.\n2. Smart code editors with real-time collaboration.\n3. Time-tracking tools to monitor productivity and focus.\n4. Virtual whiteboards for brainstorming and planning.\n5. Cloud-based design tools for easy team collaboration.\n\nThese tools will help you stay ahead of the curve and boost your efficiency!\n\nBest regards, \nTech Tools Weekly Team",
            "output": "Boost your productivity with top tech tools in 2025: \n1. AI project management tools to streamline tasks. \n2. Smart code editors for team collaboration. \n3. Time-trackers to stay focused. \n4. Virtual whiteboards for brainstorming. \n5. Cloud design tools for seamless collaboration."
          },
          {
            "text_input": "Subject: 🎉 Major Update: New Features in the Python 4.0 Release\nFrom: Python Dev News newsletter@pythonweekly.com\n\nHello David, \n\nThe Python 4.0 release is here, and it comes with some exciting new features:\n\n1. Full support for pattern matching, making complex data structures easier to work with.\n2. Performance improvements in multi-threading for faster execution.\n3. Enhanced error handling with more informative tracebacks.\n4. New data types like “frozen sets” for better memory management.\n5. Cleaner syntax to make Python even more readable.\n\nUpgrade now to take full advantage of these powerful new features.\n\nBest regards, \nPython Dev News Team",
            "output": "Python 4.0 is here with exciting new features: \n1. Pattern matching for easier data handling. \n2. Multi-threading performance improvements for speed. \n3. Enhanced error handling with clearer tracebacks. \n4. Frozen sets for better memory management. \n5. Cleaner syntax for improved readability."
          },
          {
            "text_input": "Subject: 💡 5 Must-Read Books for Aspiring Entrepreneurs\nFrom: The Hustle Weekly newsletter@thehustle.com\n\nHi David, \n\nHere are five books that every entrepreneur should read to succeed in today's business world:\n\n1. \"The Lean Startup\" by Eric Ries - A guide to building startups with minimal resources.\n2. \"Shoe Dog\" by Phil Knight - The memoir of Nike's founder and lessons learned.\n3. \"Atomic Habits\" by James Clear - Strategies for building successful habits.\n4. \"Start with Why\" by Simon Sinek - Understanding the core purpose behind your business.\n5. \"Good to Great\" by Jim Collins - Insights into how companies transition from good to great.\n\nThese books will help you build a strong foundation for your entrepreneurial journey.\n\nBest regards, \nThe Hustle Team",
            "output": "5 must-read books for aspiring entrepreneurs: \n1. \"The Lean Startup\" - Guide to efficient startups. \n2. \"Shoe Dog\" - Phil Knight's journey with Nike. \n3. \"Atomic Habits\" - Build better habits for success. \n4. \"Start with Why\" - Discover your business's core purpose. \n5. \"Good to Great\" - Transform your business into a great one."
          },
          {
            "text_input": "Subject: 🎬 New Netflix Originals You Can't Miss This Month\nFrom: Netflix Updates updates@netflix.com\n\nHi David, \n\nHere's what's new on Netflix this month:\n\n1. \"The Great Adventure\" - An epic journey through uncharted territories.\n2. \"Tech Titans\" - A documentary about the world's top tech companies.\n3. \"Whodunnit: Mystery Series\" - A gripping mystery series you won't be able to stop watching.\n4. \"Comedy Central Stand-up\" - Hilarious new stand-up specials from top comedians.\n5. \"Eco Warriors\" - A docuseries about environmental activists making a difference.\n\nEnjoy these new releases and let us know what you think!\n\nBest regards, \nNetflix Team",
            "output": "New Netflix Originals you can't miss: \n1. \"The Great Adventure\" - Epic journey into unknown lands. \n2. \"Tech Titans\" - Documentary on top tech companies. \n3. \"Whodunnit\" - Mystery series that will keep you hooked. \n4. Comedy stand-up specials for a good laugh. \n5. \"Eco Warriors\" - Activists fighting for the planet."
          },
          {
            "text_input": "Subject: 📈 Your Investment Portfolio Performance for February\nFrom: Investment Insights insights@investmentnewsletter.com\n\nHello David, \n\nYour investment portfolio performance for February is as follows:\n\n1. Tech Stocks: +12% increase in value, driven by strong earnings from major companies.\n2. Real Estate: +5% increase, thanks to the booming housing market.\n3. Bonds: +2%, steady growth despite market volatility.\n4. International Markets: +8%, with emerging markets performing well.\n5. Commodities: -3%, a slight dip due to global uncertainties.\n\nOverall, your portfolio has seen a strong positive return. Keep an eye on these sectors for continued growth.\n\nBest regards, \nInvestment Insights Team",
            "output": "Your February investment portfolio performance: \n1. Tech Stocks: +12% growth. \n2. Real Estate: +5% thanks to a strong housing market. \n3. Bonds: +2%, steady performance. \n4. International Markets: +8%, with emerging markets thriving. \n5. Commodities: -3% dip due to global factors."
          },
          {
            "text_input": "Subject: 🔒 Important: Action Required for Your Google Account Security\nFrom: Google Account Security security@google.com\n\nHi David, \n\nWe've detected unusual activity in your Google account and need you to verify your identity.\n\nPlease take the following actions immediately:\n\n1. Change your password to something stronger.\n2. Review recent activity for any unauthorized actions.\n3. Enable two-factor authentication for added security.\n4. Update your security questions.\n\nThese steps will ensure your account is safe and secure. If you didn't make this request, please contact Google support.\n\nBest regards, \nGoogle Security Team",
            "output": "Your Google account is at risk. Action required: \n1. Change your password. \n2. Review recent activity for any unauthorized actions. \n3. Enable two-factor authentication for extra security. \n4. Update your security questions."
          },
          {
            "text_input": "Subject: 🎓 Congratulations! You've been Accepted to the Coding Bootcamp\nFrom: Code Academy admissions@codeacademy.com\n\nHi David, \n\nCongratulations on your acceptance to the Coding Bootcamp! Here's what you need to know:\n\n1. The program starts on March 1st, 2025.\n2. Orientation will be held on February 25th at 10 AM.\n3. You'll receive an email with your class schedule and login details.\n4. Tuition fees are due by February 28th.\n5. Access to the online portal will be available within 48 hours.\n\nWe're excited to have you on board and look forward to seeing you at the bootcamp!\n\nBest regards, \nCode Academy Team",
            "output": "Congratulations on being accepted to the Coding Bootcamp! \n1. Program starts on March 1st. \n2. Orientation on February 25th at 10 AM. \n3. Class schedule and login details will be emailed. \n4. Tuition due by February 28th. \n5. Online portal access in 48 hours."
          },
          {
            "text_input": "Subject: 🎮 Top 10 Video Games You Need to Play This Year\nFrom: Gaming World newsletter@gamingworld.com\n\nHello David, \n\nHere are the top 10 video games to play this year:\n\n1. \"Elden Ring\" - A must-play action RPG with an open world.\n2. \"God of War: Ragnarok\" - Epic Norse mythology action game.\n3. \"Horizon Forbidden West\" - Stunning open-world adventure.\n4. \"Cyberpunk 2077\" - A futuristic action RPG with great depth.\n5. \"The Witcher 3\" - The classic RPG experience, now better than ever.\n\nThese games offer incredible gameplay, stories, and graphics, so don't miss out!\n\nBest regards, \nGaming World Team",
            "output": "Top 10 video games to play this year: \n1. \"Elden Ring\" - Open-world action RPG. \n2. \"God of War: Ragnarok\" - Epic Norse action. \n3. \"Horizon Forbidden West\" - Beautiful open-world adventure. \n4. \"Cyberpunk 2077\" - Futuristic RPG with deep gameplay. \n5. \"The Witcher 3\" - Classic RPG, now even better."
          },
          {
            "text_input": "Subject: 📱 New Apple iPhone 15 Release Announcement\nFrom: Apple News apple@apple.com\n\nHi David, \n\nWe are excited to announce the release of the new iPhone 15! Here's everything you need to know:\n\n1. The iPhone 15 comes with a new A16 chip for lightning-fast performance.\n2. A stunning OLED display for vibrant colors and sharp contrast.\n3. Advanced camera system for high-quality photos and videos.\n4. Longer battery life to keep you powered throughout the day.\n5. Available in 4 beautiful colors: Silver, Space Gray, Gold, and Blue.\n\nPre-order now to get yours today!\n\nBest regards, \nApple News Team",
            "output": "Apple iPhone 15 release is here: \n1. A16 chip for incredible performance. \n2. Stunning OLED display. \n3. Advanced camera for quality photos and videos. \n4. Longer battery life. \n5. 4 beautiful color options: Silver, Space Gray, Gold, Blue."
          },

          {
            text_input: "Subject: Microsoft's Quantum Breakthrough 🚀\n\nWelcome back, Superhuman.\n\nMicrosoft claims that in its quest to build a usable quantum computer, it just synthesized an entirely new state of matter. This could lead to faster AI discoveries in the future.\n\n📅 Date: February 20, 2025\n🔬 Topic: Quantum Breakthrough\n💡 Key Takeaway: Microsoft's new Majorana chip could speed up quantum computing by decades.\n\nRead more here: [Link]",
            output: "Microsoft's Quantum Breakthrough: A new state of matter synthesized.\n Quantum breakthrough could accelerate AI discoveries.\n Date: February 20, 2025. Read more: [Link]."
         },
         
         
      ];
      
    return trainingData;
}
export default TrainingData;
