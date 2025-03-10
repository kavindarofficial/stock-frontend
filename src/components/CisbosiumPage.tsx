import React from "react";
import { FiAward, FiDollarSign, FiCode, FiBookOpen, FiCpu, FiLayers, FiUsers } from "react-icons/fi";

// Event type definition
interface EventData {
  title: string;
  description: string;
  image: string;
  coordinators: string;
  icon: string;
  details?: string;
  rules?: string[];
  registrationLink: string;
}

const CisbosiumPage: React.FC = () => {
  // Event data
  const events: EventData[] = [
    {
      title: "Research Guru",
      description: "Unleash your research potential and showcase innovative ideas.",
      image: "/rs.png",
      coordinators: "Varshaa, Aswin and Partha",
      icon: "GraduationCap",
      details: "Craft your groundbreaking research into a compelling paper and showcase your clarity, creativity, and thought leadership. Research Guru invites students from diverse fields to present their innovative ideas and research without any domain restrictions.",
      rules: [
        "Abstract submissions are mandatory before the deadline.",
        "Papers must follow the IEEE format.",
        "Presentations must use a PPT (max 8 slides).",
        "5-6 minutes for presentation + 5 minutes Q&A.",
        "The jury's decision will be final and binding."
      ],
      registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSe-JlAhu5uAHSqg4kORVPhGeOe8M2_8X6_Fd40YftGZfbKIfQ/viewform?usp=header"
    },
    {
      title: "Shark Tank",
      description: "Pitch your innovative business ideas to a panel of industry experts.",
      image: "/shark_tank.png",
      coordinators: "Harini, Keerthana and Yuvasri",
      icon: "Presentation",
      details: "Get a chance to present your business ideas to a panel of successful entrepreneurs and investors. Receive valuable feedback and potentially secure funding for your startup.",
      rules: [
        "Teams of 1-4 members allowed.",
        "Business proposals must be submitted before the deadline.",
        "Presentation format: PPT (max 10 slides).",
        "Each team gets 6-8 minutes to pitch + 5 minutes Q&A.",
        "Proposals from all domains welcome."
      ],
      registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSe-JlAhu5uAHSqg4kORVPhGeOe8M2_8X6_Fd40YftGZfbKIfQ/viewform?usp=header"
    },
    {
      title: "Coding and Debugging",
      description: "Showcase your coding skills and debug challenging programs.",
      image: "/buc.png",
      coordinators: "Sheegan Sri, Prasath and Niktha Sahin",
      icon: "Code",
      details: "Demonstrate your programming prowess in this coding competition. Face challenging problems and debug complex code to prove your skills in various programming languages.",
      rules: [
        "Solo or duo participation allowed.",
        "Supported languages: C, C++, Python, Java.",
        "Participants must bring their own laptops if possible.",
        "Time-based scoring: Faster completion earns more points.",
        "No external help or collaboration outside the team."
      ],
      registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSe-JlAhu5uAHSqg4kORVPhGeOe8M2_8X6_Fd40YftGZfbKIfQ/viewform?usp=header"
    },
    {
      title: "Think Hack",
      description: "Crack the code, race the clock—to seize the Ultimate Innovator title!.",
      image: "/th.png",
      coordinators: "Siva, Sharvesh Guru, Nivetha",
      icon: "BrainCircuit",
      details: "Put your skills to the test in this high-energy hackathon!  Compete, create, and showcase your problem-solving abilities in an unforgettable experience.",
      rules: [
        "Teams of 1-3 members allowed.",
        "Participants should bring their own laptops.",
        "Problem statements will be provided at the start of the event.",
        "Use of AI tools is permitted but must be disclosed.",
        "Judging criteria include innovation, accuracy, and efficiency."
      ],
      registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSe-JlAhu5uAHSqg4kORVPhGeOe8M2_8X6_Fd40YftGZfbKIfQ/viewform?usp=header"
    },
    {
      title: "Stock Market Challenge",
      description: "Test your financial acumen in a simulated stock market environment.",
      image: "/vwsc.jpg",
      coordinators: "Kavindar, Venkat Sai and Hari",
      icon: "Coins",
      details: "Experience the thrill of stock trading in a risk-free environment. Make investment decisions, analyze market trends, and compete to build the most profitable portfolio.",
      rules: [
        "Solo or duo participation allowed.",
        "Participants start with a virtual budget.",
        "Trades and market fluctuations will be simulated in real-time.",
        "Strategies must be ethical and fair.",
        "The highest profit at the end of the competition wins."
      ],
      registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSe-JlAhu5uAHSqg4kORVPhGeOe8M2_8X6_Fd40YftGZfbKIfQ/viewform?usp=header"
    },
    {
      title: "MystIQ",
      description: "Unravel cryptic clues and uncover a hidden secret!",
      image: "/m.jpg",
      coordinators: "Sarvesh, joilin, Rithu Varshini",
      icon: "Puzzle",
      details: "Solve puzzles and decipher messages in this thrilling adventure. Put your detective skills to the test!",
      rules: [
        "Participants must register before the event.",
        "Solo or Duo participation allowed.",
        "Time-based scoring: The fastest team wins!",
        "Respect and fair play must be maintained.",
        "No external help or cheating allowed."
      ],
      registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSe-JlAhu5uAHSqg4kORVPhGeOe8M2_8X6_Fd40YftGZfbKIfQ/viewform?usp=header"
    }
  ];

  // Get icon component based on icon name
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "GraduationCap":
        return <FiBookOpen />;
      case "Presentation":
        return <FiLayers />;
      case "Code":
        return <FiCode />;
      case "BrainCircuit":
        return <FiCpu />;
      case "Coins":
        return <FiDollarSign />;
      case "Puzzle":
        return <FiUsers />;
      default:
        return <FiAward />;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Cisbosium 2025</h1>
        <p className="text-xl text-gray-400">Department of Computer Science and Business Systems</p>
        <div className="mt-4 inline-block px-6 py-3 bg-blue-900/30 rounded-lg border border-blue-800">
          <p className="text-lg">March 10-14, 2025</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div key={index} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-600 transition-colors group">
            <div className="h-48 bg-gray-700 relative overflow-hidden">
              {/* Fallback background with gradient if image not available */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900"></div>
              
              {/* Show image if available */}
              <div className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:opacity-90 transition-opacity"
                style={{ backgroundImage: `url(${event.image})` }}></div>
              
              {/* Overlay content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-gray-900/80 to-transparent">
                <span className="bg-blue-600/90 text-white text-xs font-medium px-2.5 py-1 rounded inline-flex items-center w-fit mb-2">
                  {getIconComponent(event.icon)}
                  <span className="ml-1.5">Event</span>
                </span>
                <h2 className="text-xl font-bold text-white">{event.title}</h2>
              </div>
            </div>
            
            <div className="p-5">
              <p className="text-gray-300 mb-4">{event.description}</p>
              
              <div className="mb-4">
                <h3 className="text-sm text-gray-400 mb-2">Coordinators</h3>
                <p className="text-white">{event.coordinators}</p>
              </div>
              
              {event.rules && (
                <div className="mb-4">
                  <h3 className="text-sm text-gray-400 mb-2">Key Rules</h3>
                  <ul className="list-disc pl-5 text-gray-300 text-sm space-y-1">
                    {event.rules.slice(0, 2).map((rule, ruleIndex) => (
                      <li key={ruleIndex}>{rule}</li>
                    ))}
                    {event.rules.length > 2 && <li>...and more</li>}
                  </ul>
                </div>
              )}
              
              <a 
                href={event.registrationLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors mt-2"
              >
                Register Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CisbosiumPage; 