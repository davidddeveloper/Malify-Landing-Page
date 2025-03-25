const ClassificationData = () => {
    const trainingData = [
        {
          "text_input": "Subject: Your Interview at TechCorp\nFrom: hr@techcorp.com\nDear [Name], We are pleased to invite you for an interview for the Software Engineer position. Your interview is scheduled for March 5th at 10:00 AM.",
          "output": "Important"
        },
        {
          "text_input": "Subject: Limited-Time Offer on Laptops\nFrom: deals@electronics.com\nGet 20% off the latest laptops! Offer valid till Sunday. Click here to buy now!",
          "output": "Not Important"
        },
        {
          "text_input": "Subject: Team Meeting Reminder - Tomorrow at 2 PM\nFrom: manager@company.com\nJust a quick reminder about our scheduled team meeting tomorrow at 2 PM in the conference room.",
          "output": "Medium"
        },
        {
          "text_input": "Subject: Your Application for the AI Fellowship\nFrom: admissions@aifellowship.org\nCongratulations! You have been shortlisted for the AI Fellowship. Please confirm your availability for the next interview round.",
          "output": "Important"
        },
        {
          "text_input": "Subject: Free Webinar on AI & Machine Learning\nFrom: events@techwebinar.com\nJoin our free webinar on AI trends this Saturday. Limited seats available! Register now.",
          "output": "Medium"
        },
        {
          "text_input": "Subject: Win $10,000 in Our Coding Hackathon!\nFrom: hackathon@techstartup.com\nAre you a passionate coder? Participate in our upcoming hackathon for a chance to win cash prizes and mentorship opportunities.",
          "output": "Important"
        },
        {
          "text_input": "Subject: Update: Your Monthly Bank Statement\nFrom: notifications@bank.com\nYour monthly bank statement for February is now available. Click here to view your statement securely.",
          "output": "Important"
        },
        {
          "text_input": "Subject: Flash Sale! 50% Off on Shoes\nFrom: sales@fashionstore.com\nHurry up! Grab your favorite shoes at half price. Limited stock available.",
          "output": "Not Important"
        },
        {
          "text_input": "Subject: Your Subscription Will Expire Soon\nFrom: support@streamingservice.com\nYour premium subscription will expire in 3 days. Renew now to continue enjoying uninterrupted service.",
          "output": "Medium"
        },
        {
          "text_input": "Subject: Big 5 Investment Innovation Challenge – Win Your Share of $60,000!\nFrom: Ministry of Communication Technology and Innovation\nAre you building an innovative solution that aligns with Sierra Leone's national priorities? The Big 5 Investment Innovation Challenge is your opportunity to scale your business and make a lasting impact!",
          "output": "Important"
        },
        {
          "text_input": "Subject: New Course Available: Learn Python in 30 Days\nFrom: courses@onlinelearning.com\nEnroll now in our self-paced Python course and enhance your coding skills!",
          "output": "Medium"
        },
        {
          "text_input": "Subject: Reminder: Your Doctor's Appointment on March 10\nFrom: clinic@healthcare.com\nJust a friendly reminder of your upcoming doctor's appointment scheduled for March 10 at 11:00 AM.",
          "output": "Important"
        },
        {
          "text_input": "Subject: Job Fair - Hiring Opportunities in Tech\nFrom: careers@jobfair.com\nLooking for a new job? Attend our virtual job fair and connect with top tech companies hiring now.",
          "output": "Medium"
        },
        {
          "text_input": "Subject: Congratulations! You Won a $500 Amazon Gift Card\nFrom: randomsender@unknown.com\nClick the link below to claim your prize now!",
          "output": "Not Important"
        },
        {
          "text_input": "Subject: Free E-Book: 10 Tips to Improve Your Coding Skills\nFrom: newsletter@developerhub.com\nDownload your free e-book and take your coding skills to the next level!",
          "output": "Not Important"
        },
        {
            "text_input": "Subject: Payment Received - Invoice #12345\nFrom: billing@company.com\nDear Customer, We have received your payment for invoice #12345. Thank you for your business!",
            "output": "Important"
        },
        {
        "text_input": "Subject: Upcoming Software Update - Action Required\nFrom: support@techservice.com\nWe are rolling out a mandatory update to improve security and performance. Please update your software before March 15 to avoid service disruptions.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Don't Miss Out! Exclusive Travel Deals Inside\nFrom: deals@travelworld.com\nBook now and save up to 40% on flights and hotels!",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Reminder: Your Domain Name Expires Soon\nFrom: admin@domainservice.com\nYour domain is set to expire on April 10. Renew now to prevent losing your website.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Office Closed for Public Holiday\nFrom: hr@company.com\nDear Team, Please be reminded that our office will be closed on March 8 due to the national holiday.",
        "output": "Medium"
        },
        {
        "text_input": "Subject: Your Amazon Order Has Shipped!\nFrom: orders@amazon.com\nGreat news! Your order #789654 has been shipped and is on its way. Expected delivery: March 12.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Networking Event: Meet Industry Leaders!\nFrom: events@techconference.com\nJoin us for an exclusive networking event to connect with top professionals in the tech industry.",
        "output": "Medium"
        },
        {
        "text_input": "Subject: Earn Money Working From Home - No Experience Needed!\nFrom: unknown@randomsender.com\nMake $500 a day from the comfort of your home! Click here to learn more.",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Annual Performance Review Meeting Scheduled\nFrom: hr@company.com\nDear [Employee], Your annual performance review is scheduled for March 15 at 2:00 PM. Please confirm your availability.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Your Flight Itinerary - Confirmation #56789\nFrom: bookings@airline.com\nYour flight from Freetown to London is confirmed. Departure: April 5 at 10:30 AM.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Job Application Status Update\nFrom: careers@techstartup.com\nDear [Name], Thank you for applying to our Software Engineer position. We will be in touch soon regarding next steps.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Get Your FREE Coffee Today!\nFrom: promos@coffeebrand.com\nStop by any of our locations today and enjoy a free cup of coffee on us!",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Urgent: Security Alert on Your Account\nFrom: security@bank.com\nWe detected an unusual login attempt on your account. If this wasn't you, reset your password immediately.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Invitation: Exclusive Startup Founders Meetup\nFrom: networking@startupclub.com\nAre you a startup founder? Join us for an invite-only networking session with investors and mentors.",
        "output": "Medium"
        },
        {
        "text_input": "Subject: Reminder: Project Deadline Approaching\nFrom: manager@company.com\nJust a reminder that the deadline for Project X is March 20. Please ensure all tasks are completed on time.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Huge Discounts on Electronics - Today Only!\nFrom: sales@techshop.com\nHurry! Get 30% off on the latest gadgets. Limited stock available!",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Congratulations! Your Grant Application Has Been Approved\nFrom: funding@grantfoundation.org\nDear [Name], We are pleased to inform you that your grant application has been approved. More details attached.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Welcome to Our Newsletter - Stay Updated!\nFrom: newsletter@company.com\nThank you for subscribing! Get the latest updates and industry news straight to your inbox.",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Action Required: Verify Your Email Address\nFrom: noreply@verification.com\nTo continue using our services, please verify your email address by clicking the link below.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Reminder: Conference Call Scheduled for Tomorrow\nFrom: assistant@company.com\nHi Team, Just a quick reminder that we have a conference call scheduled for 11 AM tomorrow.",
        "output": "Medium"
        },
        {
        "text_input": "Subject: New Blog Post: 5 Ways to Improve Productivity\nFrom: blog@techinsights.com\nCheck out our latest blog post on boosting productivity in the workplace.",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Your Electricity Bill is Due Soon\nFrom: billing@utilitycompany.com\nYour latest electricity bill is due on March 28. Click here to make a payment.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Exclusive Access to Beta Test Our New App\nFrom: beta@startup.com\nWe're inviting selected users to beta test our upcoming app before its official launch. Sign up now!",
        "output": "Medium"
        },
        {
        "text_input": "Subject: Confirm Your Attendance: Business Strategy Workshop\nFrom: events@corporate.com\nPlease confirm your attendance for the upcoming Business Strategy Workshop on April 2.",
        "output": "Medium"
        },
        {
        "text_input": "Subject: Unbelievable! Lose Weight Fast with This Simple Trick\nFrom: spam@randomsite.com\nDoctors hate this one secret for losing weight! Click here to find out more.",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Your Insurance Policy Renewal Notice\nFrom: support@insurancecompany.com\nYour insurance policy is set to expire on May 1. Renew now to avoid a coverage lapse.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Invitation: Join Our Startup Accelerator Program\nFrom: accelerator@startuphub.com\nApplications are open for our next startup accelerator program. Get mentorship, funding, and resources to scale your business.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Free Online Coding Bootcamp - Limited Slots!\nFrom: learn@codingacademy.com\nJoin our free coding bootcamp and learn Python, JavaScript, and more. Sign up today!",
        "output": "Medium"
        },
        {
        "text_input": "Subject: Time-Sensitive: Claim Your Discount Now\nFrom: promo@onlinestore.com\nYour exclusive discount code expires in 24 hours! Use code SAVE20 at checkout.",
        "output": "Not Important"
        },





        {
            "text_input": "Subject: Your Tax Filing Deadline is Approaching\nFrom: noreply@taxagency.gov\nDear Taxpayer, Your annual tax return is due on April 15. Please ensure your filings are submitted before the deadline to avoid penalties.",
            "output": "Important"
        },
        {
        "text_input": "Subject: Urgent: Your Bank Account Has Been Temporarily Locked\nFrom: security@nationalbank.com\nWe detected suspicious activity on your account and have temporarily locked it for security reasons. Click here to verify your identity.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Your Subscription Will Expire Soon\nFrom: support@streamingplatform.com\nDear [Name], Your subscription will expire on March 10. Renew now to continue enjoying our services.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Meeting Rescheduled to 3 PM\nFrom: hr@company.com\nThe team meeting originally scheduled for 2 PM has been moved to 3 PM. Please update your calendar accordingly.",
        "output": "Medium"
        },
        {
        "text_input": "Subject: Weekly Grocery Deals – Save Big This Weekend!\nFrom: promotions@supermart.com\nCheck out this week’s top grocery discounts! Save up to 30% on household essentials.",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Invitation: Annual Charity Gala – RSVP Now\nFrom: events@charityfoundation.com\nJoin us for our annual charity gala to support underprivileged children. Reserve your spot today!",
        "output": "Medium"
        },
        {
        "text_input": "Subject: Suspicious Login Attempt on Your Email Account\nFrom: security@emailprovider.com\nWe noticed an unusual login attempt on your email account from an unknown device. If this was not you, please change your password immediately.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Flash Sale – 50% Off Electronics for 24 Hours!\nFrom: deals@onlineretailer.com\nHurry! For the next 24 hours, get 50% off select electronic items. Don’t miss out!",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Your Health Insurance Coverage Update\nFrom: support@healthinsurance.com\nDear [Name], Your health insurance coverage has been updated. Please review the changes in your policy.",
        "output": "Important"
        },
        {
        "text_input": "Subject: New Job Opening: Software Developer at TechCorp\nFrom: careers@techcorp.com\nWe are hiring! If you are a skilled software developer, apply today to join our team.",
        "output": "Medium"
        },
        {
        "text_input": "Subject: Flight Delay Notification: Flight 789 to New York\nFrom: alerts@airline.com\nYour flight to New York has been delayed by 2 hours due to weather conditions. Please check the airline website for updates.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Exclusive Invite: VIP Shopping Event\nFrom: invites@luxurybrand.com\nJoin us for an exclusive VIP shopping experience with early access to our latest collection.",
        "output": "Medium"
        },
        {
        "text_input": "Subject: Your Mobile Bill is Now Available\nFrom: billing@telecomprovider.com\nYour latest mobile bill is now available. Due date: March 25. Click here to view and pay your bill.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Special Offer: Buy One Get One Free – Today Only!\nFrom: promotions@fastfoodchain.com\nEnjoy a limited-time Buy One Get One Free deal on all burgers. Offer valid today only!",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Important: Action Required for Your Student Loan\nFrom: support@studentloanagency.com\nYou have an outstanding student loan payment due. Please complete the required action to avoid penalties.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Your Package Has Been Delivered\nFrom: tracking@courierservice.com\nYour package has been successfully delivered to your address at 2:30 PM today.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Cyber Monday Deals – Up to 70% Off!\nFrom: sales@electronicsstore.com\nCyber Monday is here! Grab your favorite gadgets at unbeatable prices while stocks last.",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Scholarship Application Deadline Extended\nFrom: scholarships@university.com\nGood news! The deadline to apply for our scholarship program has been extended to March 31. Submit your application now!",
        "output": "Important"
        },
        {
        "text_input": "Subject: Your Electricity Usage Report is Ready\nFrom: support@powercompany.com\nYour electricity usage report for this month is now available. Click here to view your detailed consumption data.",
        "output": "Important"
        },



        {
            "text_input": "Subject: Urgent: Action Required for Tax Filing\nFrom: taxdept@gov.sl\nDear Taxpayer, You have outstanding tax documents that must be submitted before March 31. Failure to comply may result in penalties.",
            "output": "Important"
        },
        {
        "text_input": "Subject: Invitation: Sierra Leone Business Leaders Forum\nFrom: events@businessforum.com\nJoin top executives and policymakers for a discussion on economic growth and investment opportunities.",
        "output": "Medium"
        },
        {
        "text_input": "Subject: Your Subscription is Expiring Soon!\nFrom: support@streamingservice.com\nYour premium subscription will expire in 3 days. Renew now to continue enjoying ad-free content.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Your LinkedIn Profile is Getting Noticed!\nFrom: notifications@linkedin.com\nYour profile appeared in 10 searches this week! See who viewed your profile.",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Sierra Leone Innovates - Apply Now for $60,000 in Funding!\nFrom: comms@mocti.gov.sl\nAre you an innovator solving Sierra Leone’s biggest challenges? Apply now for the Big 5 Innovation Challenge and win funding!",
        "output": "Important"
        },
        {
        "text_input": "Subject: Weekly Deals: Save Big on Home Appliances\nFrom: deals@electronicsworld.com\nThis week only! Get up to 50% off on refrigerators, washing machines, and more.",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Your Bank Statement for February\nFrom: noreply@bank.com\nDear Customer, Your monthly bank statement is now available. Log in to your account to view details.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Interview Invitation: Software Engineer Role\nFrom: hr@techcompany.com\nDear David, Congratulations! We’d like to invite you for an interview for the Software Engineer position.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Reminder: Rent Payment Due Soon\nFrom: landlord@rentalservices.com\nDear Tenant, This is a reminder that your rent payment is due by March 5. Please make arrangements accordingly.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Job Alert: New Opportunities in Your Field\nFrom: jobs@careersite.com\nNew job postings that match your profile are available now. Apply today!",
        "output": "Medium"
        },
        {
        "text_input": "Subject: Security Alert: Unusual Activity Detected\nFrom: security@paypal.com\nWe detected a login attempt from an unknown device. If this wasn’t you, reset your password immediately.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Congratulations! You’ve Won a Free Vacation\nFrom: travel@randomsite.com\nClaim your free vacation today! Just pay a small processing fee.",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Important: Server Maintenance Downtime\nFrom: support@webhosting.com\nOur servers will be down for maintenance on March 10 from 1 AM to 3 AM. We apologize for the inconvenience.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Reminder: Upcoming Medical Check-Up\nFrom: hospital@healthcare.com\nYour annual health check-up is scheduled for March 20 at 10:00 AM. Please confirm your attendance.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Flash Sale: Up to 70% Off Everything!\nFrom: sales@fashionstore.com\nHurry! Shop now before the sale ends at midnight.",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Welcome to Our Community!\nFrom: welcome@onlineforum.com\nThank you for joining our online community. Engage in discussions and stay updated on industry trends.",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Action Required: Update Your Account Information\nFrom: support@mobilecarrier.com\nDear Customer, To continue using our services, please update your account details before March 15.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Invitation: Attend Our Virtual Tech Summit\nFrom: events@techsummit.com\nJoin us for the biggest tech summit of the year! Register now to secure your spot.",
        "output": "Medium"
        },
        {
        "text_input": "Subject: Your Invoice #456789 is Ready\nFrom: billing@softwarecompany.com\nDear Customer, Your latest invoice is available. Please make a payment before the due date to avoid service interruptions.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Investment Opportunity: Learn How to Multiply Your Wealth\nFrom: unknown@randomdomain.com\nDiscover a new way to make money with little to no effort! Sign up now.",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Special Invitation: AI & Business Conference\nFrom: invites@businessconference.com\nJoin top AI experts and business leaders for an exclusive conference on the future of AI in business.",
        "output": "Medium"
        },
        {
        "text_input": "Subject: Auto Loan Approval Confirmation\nFrom: finance@autoloans.com\nCongratulations! Your auto loan has been approved. Check your email for next steps.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Your Shipment Has Arrived!\nFrom: shipping@ecommerce.com\nGreat news! Your order #789123 has arrived and is ready for pickup.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Claim Your Free Crypto Now!\nFrom: crypto@scamsite.com\nClick here to claim your free cryptocurrency worth $500 today!",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Urgent: Travel Visa Approval Needed\nFrom: embassy@travelauthority.com\nYour travel visa application is missing a required document. Please submit it immediately to avoid delays.",
        "output": "Important"
        },
        {
        "text_input": "Subject: We Miss You! Come Back and Get 20% Off\nFrom: promo@onlinestore.com\nHaven’t shopped with us in a while? Enjoy 20% off your next purchase!",
        "output": "Not Important"
        },
        {
        "text_input": "Subject: Last Chance: Early Bird Registration Ends Tomorrow\nFrom: conference@businesssummit.com\nSecure your spot at our annual business summit before prices go up!",
        "output": "Medium"
        },
        {
        "text_input": "Subject: Successful Password Change Confirmation\nFrom: security@onlinebank.com\nYour password was successfully changed. If this wasn’t you, contact support immediately.",
        "output": "Important"
        },
        {
        "text_input": "Subject: Exclusive Beta Access: Try Our New AI Tool\nFrom: beta@aitools.com\nBe among the first to test our latest AI-powered productivity tool. Limited slots available!",
        "output": "Medium"
        },
        {
        "text_input": "Subject: Scholarship Alert: Apply Now for Fully Funded Programs\nFrom: scholarships@educationfund.org\nWe are offering fully funded scholarships for undergraduate and graduate students. Apply now!",
        "output": "Important"
        }

    ]    
      
    return trainingData;
}
export default ClassificationData;