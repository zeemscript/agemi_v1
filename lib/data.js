import {
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  FaUserPlus,
  FaSearch,
  FaUsers,
  FaGraduationCap,
  FaHeart,
  FaStar,
} from "react-icons/fa";

import { Book } from "lucide-react";

export const links = [
  {
    title: "Classes",
    url: "/dashboard/classes",
    icon: Book, // Icon for the link
    badge: "New", // Badge text
  },
  {
    title: "Assignments",
    url: "/dashboard/assignments",
    icon: Book,
    badge: "Due",
  },
  {
    title: "Exams",
    url: "/dashboard/exams",
    icon: Book,
    badge: "Upcoming",
  },
  {
    title: "Results",
    url: "/dashboard/results",
    icon: Book,
    badge: "Updated",
  },
];

export const data = {
  navMain: [
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Ask AI",
      url: "/dashboard/ai",
      icon: Sparkles,
    },
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: true,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
      badge: "10",
    },
  ],
  navSecondary: [
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
    {
      title: "Templates",
      url: "#",
      icon: Blocks,
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2,
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion,
    },
  ],
};

export const books = [
  {
    id: 1,
    title: "Riyadh as-Salihin",
    author: "Imam Nawawi",
    category: "Hadith",
    price: 0,
    readCount: 120,
    rating: 5.0,
    image: "/images/img-2.jpeg",
  },
  {
    id: 2,
    title: "The Fundamentals of Tawheed",
    author: "Dr. Bilal Philips",
    category: "Aqidah",
    price: 5,
    readCount: 45,
    rating: 4.5,
    image: "/images/img-2.jpeg",
  },
  {
    id: 3,
    title: "In the Footsteps of the Prophet",
    author: "Tariq Ramadan",
    category: "Seerah",
    price: 5,
    readCount: 60,
    rating: 2.5,
    image: "/images/img-2.jpeg",
  },
  {
    id: 4,
    title: "Fortress of the Muslim",
    author: "Sa'id bin Wahf al-Qahtani",
    category: "Dua",
    price: 0,
    readCount: 220,
    rating: 5.0,
    image: "/images/img-2.jpeg",
  },
  {
    id: 5,
    title: "Don't Be Sad",
    author: "Dr. Aaidh al-Qarni",
    category: "Self-help",
    price: 10,
    readCount: 180,
    rating: 4.7,
    image: "/images/img-2.jpeg",
  },
  {
    id: 6,
    title: "La Tahzan (Don't Be Sad)",
    author: "Dr. Aaidh al-Qarni",
    category: "Motivation",
    price: 8,
    readCount: 90,
    rating: 4.2,
    image: "/images/img-2.jpeg",
  },
  {
    id: 7,
    title: "Stories of the Prophets",
    author: "Ibn Kathir",
    category: "History",
    price: 0,
    readCount: 150,
    rating: 5.0,
    image: "/images/img-2.jpeg",
  },
  {
    id: 8,
    title: "Fiqh-us-Sunnah",
    author: "Sayyid Sabiq",
    category: "Fiqh",
    price: 15,
    readCount: 75,
    rating: 4.6,
    image: "/images/img-2.jpeg",
  },
  {
    id: 9,
    title: "The Sealed Nectar",
    author: "Safiyyur-Rahman al-Mubarakpuri",
    category: "Seerah",
    price: 12,
    readCount: 210,
    rating: 4.9,
    image: "/images/img-2.jpeg",
  },
  {
    id: 10,
    title: "Tafsir Ibn Kathir",
    author: "Ibn Kathir",
    category: "Tafsir",
    price: 0,
    readCount: 300,
    rating: 5.0,
    image: "/images/img-2.jpeg",
  },
  {
    id: 11,
    title: "The Book of Manners",
    author: "Fu'ad Ibn 'Abd Al-'Azeez Ash-Shulhoob",
    category: "Akhlaq",
    price: 5,
    readCount: 100,
    rating: 4.4,
    image: "/images/img-2.jpeg",
  },
  {
    id: 12,
    title: "The Life of Muhammad",
    author: "Muhammad Husayn Haykal",
    category: "Biography",
    price: 10,
    readCount: 95,
    rating: 4.3,
    image: "/images/img-2.jpeg",
  },
  {
    id: 13,
    title: "Explanation of the Three Fundamental Principles",
    author: "Shaykh Muhammad ibn Saalih al-Uthaymeen",
    category: "Aqidah",
    price: 6,
    readCount: 55,
    rating: 4.6,
    image: "/images/img-2.jpeg",
  },
  {
    id: 14,
    title: "The Creed of Imam Tahawi",
    author: "Imam Abu Ja'far al-Tahawi",
    category: "Aqidah",
    price: 7,
    readCount: 40,
    rating: 4.1,
    image: "/images/img-2.jpeg",
  },
  {
    id: 15,
    title: "Purification of the Heart",
    author: "Hamza Yusuf",
    category: "Tazkiyah",
    price: 9,
    readCount: 65,
    rating: 4.7,
    image: "/images/img-2.jpeg",
  },
  {
    id: 16,
    title: "The Path to Guidance",
    author: "Ibn Qudamah al-Maqdisi",
    category: "Spirituality",
    price: 5,
    id: 17,
    title: "Kitab al-Tawheed",
    author: "Muhammad ibn Abdul Wahhab",
    category: "Aqidah",
    price: 0,
    readCount: 140,
    rating: 4.9,
    image: "/images/img-2.jpeg",
  },
  {
    id: 18,
    title: "The Ideal Muslimah",
    author: "Dr. Muhammad Ali Al-Hashimi",
    category: "Women",
    price: 10,
    readCount: 110,
    rating: 4.8,
    image: "/images/img-2.jpeg",
  },
  {
    id: 19,
    title: "The Ideal Muslim",
    author: "Dr. Muhammad Ali Al-Hashimi",
    category: "Men",
    price: 10,
    readCount: 70,
    rating: 4.6,
    image: "/images/img-2.jpeg",
  },
  {
    id: 20,
    title: "Al-Adab Al-Mufrad",
    author: "Imam Bukhari",
    category: "Hadith",
    price: 0,
    readCount: 130,
    rating: 5.0,
    image: "/images/img-2.jpeg",
  },
  {
    id: 21,
    title: "Signs Before the Day of Judgment",
    author: "Ibn Kathir",
    category: "End Times",
    price: 5,
    readCount: 125,
    rating: 4.3,
    image: "/images/img-2.jpeg",
  },
  {
    id: 22,
    title: "A Brief Illustrated Guide to Understanding Islam",
    author: "I.A. Ibrahim",
    category: "Introductory",
    price: 0,
    readCount: 200,
    rating: 4.5,
    image: "/images/img-2.jpeg",
  },
  {
    id: 23,
    title: "Enjoy Your Life",
    author: "Dr. Muhammad al-Arifi",
    category: "Self-help",
    price: 6,
    readCount: 85,
    rating: 4.7,
    image: "/images/img-2.jpeg",
  },
];

export const spaces = [
  {
    id: "space001",
    title: "Fiqh of Ramadan: Deep Dive",
    description: "Join us for a detailed session on fasting rules & rewards.",
    thumbnail: "/images/img-3.jpg",
    category: "Fiqh",
    status: "live",
    startTime: "2025-05-23T18:00:00Z",
    duration: 60,
    host: {
      name: "Ustadh Ali Mukhtar",
      image: "/images/img-2.jpeg",
    },
  },
  {
    id: "space002",
    title: "Understanding Zakat: Spiritual & Social Impact",
    description: "Explore how Zakat purifies wealth and supports communities.",
    thumbnail: "/images/img-3.jpg",
    category: "Fiqh",
    status: "upcoming",
    startTime: "2025-05-24T16:00:00Z",
    duration: 45,
    host: {
      name: "Ustadh Maryam Usman",
      image: "/images/img-3.jpg",
    },
  },
  {
    id: "space003",
    title: "Hadith Circle: Sahih Bukhari Selections",
    description: "Reflect on hadiths and their meanings in today's world.",
    thumbnail: "/images/mosque.png",
    category: "Hadith",
    status: "live",
    startTime: "2025-05-25T20:00:00Z",
    duration: 50,
    host: {
      name: "Ustadh Ahmad Bello",
      image: "/images/book1.jpg",
    },
  },
];

export const usermessages = [
  {
    name: "Abu Zayd",
    message: " Hello, when do have the meting",
    image: "/images/mosque.png",
  },
  {
    name: "Abdul Hazeem",
    message: " Hello, when do have the meting",
    image: "/images/book1.jpg",
  },
  {
    name: "Ibn AbdulRasaq",
    message: " Hello, when do have the meting",
    image: "/images/img-2.jpeg",
  },
  {
    name: "Muhammad Jamiu",
    message: "Salamualaykum brother",
    image: "/images/man.jpg",
  },
  {
    name: "Abdul Hazeem",
    message: " Hello, when do have the meting",
    image: "/images/img1.jpeg",
  },
  {
    name: "Abdul Samad",
    message: " Hello, when do have the meting",
    image: "/images/profile-setup-img.jpeg",
  },
  {
    name: "Faruq Sherifdeen",
    message: " Hello, when do have the meting",
    image: "/images/auth.jpg",
  },
  {
    name: "Ali Jamal",
    message: " Hello, when do have the meting",
    image: "/images/mosque.png",
  },
  {
    name: "Ali Mutmaina",
    message: "Aw far, how u doing?",
    image: "/images/img-4.jpg",
  },
  {
    name: "Raheem Fuad",
    message: "Test this course for me, abeg 🙏",
    image: "/images/img-3.jpg",
  },
];

export const islamicCategories = [
  {
    main: "Core Islamic Sciences",
    subcategories: [
      "Qur’an & Tafsir",
      "Hadith & Sunnah",
      "Fiqh (Islamic Jurisprudence)",
      "Aqeedah (Islamic Creed/Belief)",
      "Seerah (Life of the Prophet ﷺ)",
      "Usul al-Fiqh (Principles of Jurisprudence)",
    ],
  },
  {
    main: "Personal Development & Spirituality",
    subcategories: [
      "Tazkiyah (Self-Purification)",
      "Islamic Manners (Adab)",
      "Duas & Dhikr",
      "Islamic Mindfulness",
      "Islamic Psychology",
    ],
  },
  {
    main: "Daily Practice & Worship",
    subcategories: [
      "Salah (Prayer)",
      "Fasting (Sawm)",
      "Zakah & Charity",
      "Hajj & Umrah",
      "Purification (Taharah)",
    ],
  },
  {
    main: "Lifestyle & Society",
    subcategories: [
      "Marriage & Family",
      "Parenting",
      "Business & Finance (Islamic)",
      "Modesty & Hijab",
      "Halal & Haram",
    ],
  },
  {
    main: "Ummah & Global Topics",
    subcategories: [
      "Islamic History",
      "Contemporary Issues",
      "Muslim Youth",
      "Dawah & Outreach",
      "Islam & Technology",
    ],
  },
  {
    main: "Audience-Based",
    subcategories: [
      "For New Muslims",
      "For Youth",
      "For Sisters",
      "For Brothers",
      "For Children",
    ],
  },
];
export const steps = [
  {
    id: 1,
    icon: <FaUserPlus className="text-white w-6 h-6" />,
    title: "Join Community",
    desc: "Create your account and become part of our growing Ummah",
    position: "top-0 left-1/2 -translate-x-1/2 -translate-y-4",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 2,
    icon: <FaSearch className="text-white w-6 h-6" />,
    title: "Discover Resources",
    desc: "Explore curated courses, books, and learning materials",
    position: "top-1/4 right-4 translate-x-0",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 3,
    icon: <FaUsers className="text-white w-6 h-6" />,
    title: "Connect & Learn",
    desc: "Join live sessions and connect with fellow Muslims",
    position: "bottom-1/4 right-4 translate-x-0",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    icon: <FaGraduationCap className="text-white w-6 h-6" />,
    title: "Grow Together",
    desc: "Share knowledge and grow in your spiritual journey",
    position: "bottom-0 left-1/2 -translate-x-1/2 translate-y-4",
    color: "from-orange-500 to-red-500",
  },
  {
    id: 5,
    icon: <FaUsers className="text-white w-6 h-6" />,
    title: "Share Knowledge",
    desc: "Contribute your wisdom and inspire others in the community",
    position: "bottom-1/4 left-4 -translate-x-0",
    color: "from-indigo-500 to-blue-500",
  },
  {
    id: 6,
    icon: <FaGraduationCap className="text-white w-6 h-6" />,
    title: "Achieve Excellence",
    desc: "Reach spiritual heights and become a beacon of knowledge",
    position: "top-1/4 left-4 -translate-x-0",
    color: "from-green-500 to-emerald-500",
  },
];
export const partners = [
  {
    name: "Islamic Relief",
    logo: "https://logo.clearbit.com/islamic-relief.org",
  },
  { name: "Muslim Aid", logo: "https://logo.clearbit.com/muslimaid.org" },
  {
    name: "Islamic Society of North America",
    logo: "https://logo.clearbit.com/isna.net",
  },
  {
    name: "Council on American-Islamic Relations",
    logo: "https://logo.clearbit.com/cair.com",
  },
  {
    name: "Islamic Foundation",
    logo: "https://logo.clearbit.com/islamicfoundation.org",
  },
  { name: "Muslim World League", logo: "https://logo.clearbit.com/themwl.org" },
  {
    name: "Islamic Development Bank",
    logo: "https://logo.clearbit.com/isdb.org",
  },
  {
    name: "Organization of Islamic Cooperation",
    logo: "https://logo.clearbit.com/oic-oci.org",
  },
  {
    name: "Islamic Chamber of Commerce",
    logo: "https://logo.clearbit.com/iccwbo.org",
  },
  {
    name: "International Islamic University",
    logo: "https://logo.clearbit.com/iiu.edu.pk",
  },
  {
    name: "Al-Azhar University",
    logo: "https://logo.clearbit.com/azhar.edu.eg",
  },
  {
    name: "King Fahd Islamic Center",
    logo: "https://logo.clearbit.com/kfipc.org",
  },
  {
    name: "Islamic Cultural Center",
    logo: "https://logo.clearbit.com/iccuk.org",
  },
  {
    name: "Muslim Association of Britain",
    logo: "https://logo.clearbit.com/mabonline.net",
  },
  {
    name: "Islamic Society of Britain",
    logo: "https://logo.clearbit.com/isb.org.uk",
  },
  {
    name: "Muslim Council of Britain",
    logo: "https://logo.clearbit.com/mcb.org.uk",
  },
  {
    name: "Islamic Foundation of Toronto",
    logo: "https://logo.clearbit.com/islamicfoundation.ca",
  },
  {
    name: "Islamic Society of Greater Houston",
    logo: "https://logo.clearbit.com/isgh.org",
  },
  {
    name: "Islamic Center of Southern California",
    logo: "https://logo.clearbit.com/icocmasjid.org",
  },
  {
    name: "Islamic Center of America",
    logo: "https://logo.clearbit.com/icofa.com",
  },
];

// "use client";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import Button from "@/components/atoms/form/Button";
// import Image from "next/image";
// import {
//   Avatar,
//   AvatarFallback,
//   AvatarImage,
// } from "@/components/ui/avatar";
// import { VideoIcon, Clock } from "lucide-react";
// import { format } from "date-fns";

// const SpaceCard = ({ space }) => {
//   const {
//     id,
//     title,
//     description,
//     thumbnail,
//     category,
//     status,
//     startTime,
//     duration,
//     host,
//   } = space;

//   const formattedTime = format(new Date(startTime), "PPpp");

//   return (
//     <Card className="relative flex flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 via-white to-green-100/80 backdrop-blur-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all group border-0">
//       {/* Thumbnail */}
//       <div className="relative h-56 w-full">
//         <Image
//           src={thumbnail || "/images/space-placeholder.jpg"}
//           alt={title}
//           fill
//           className="object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-3xl border-b-4 border-accent/10 shadow-lg"
//           priority
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
//         {/* Category + Status */}
//         <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
//           {category && (
//             <Badge className="bg-white/80 text-accent font-bold px-3 py-1 rounded-full shadow border-0 text-xs uppercase tracking-wider">
//               {category}
//             </Badge>
//           )}
//           {status === "live" && (
//             <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-accent text-white text-xs rounded-full font-semibold shadow-md animate-pulse border-0">
//               🟢 Live
//             </div>
//           )}
//         </div>
//       </div>
// {/*
//       {/* New Layout: Host, Title, Description, Meta, Button */}
//       <div className="flex flex-col gap-3 px-6 py-4 flex-1">
//         {/* Host */}
//         <div className="flex items-center gap-3 mb-2">
//           <Avatar className="h-10 w-10 rounded-xl shadow">
//             <AvatarImage
//               src={host?.image || "/images/avatar-placeholder.png"}
//               alt={host?.name}
//             />
//             <AvatarFallback className="rounded-xl">
//               {host?.name?.slice(0, 2).toUpperCase() || "HN"}
//             </AvatarFallback>
//           </Avatar>
//           <div className="flex flex-col">
//             <span className="font-semibold text-accent leading-tight text-base">{host?.name || "Ustadh Ahmad"}</span>
//             <span className="text-muted-foreground text-xs">Host</span>
//           </div>
//         </div>

//         {/* Title & Description */}
//         <div className="mb-2">
//           <CardTitle className="text-lg font-extrabold line-clamp-1 text-accent drop-shadow-sm mb-1">
//             {title}
//           </CardTitle>
//           <p className="text-sm text-muted-foreground line-clamp-2">
//             {description}
//           </p>
//         </div>

//         {/* Meta Info */}
//         <div className="flex items-center justify-between gap-4 mt-2 mb-4">
//           <div className="flex items-center gap-2 text-xs text-muted-foreground">
//             <Clock className="h-4 w-4 text-accent" />
//             <span className="font-medium text-accent/90">{formattedTime}</span>
//           </div>
//           <div className="bg-gradient-to-r from-highlight to-accent text-white px-2 py-0.5 rounded-full font-bold shadow border-0 text-xs">
//             {duration} mins
//           </div>
//         </div>

//         {/* CTA Button */}
//         <Button
//           wide
//           round
//           className="w-full bg-gradient-to-r from-highlight to-accent text-white hover:brightness-110 hover:scale-[1.01] text-base font-bold shadow-lg transition-all py-3 mt-auto"
//           to={`/dashboard/spaces/${id}`}
//         >
//           <VideoIcon className="h-5 w-5 mr-2" />
//           Join Space
//         </Button>
//       </div>
//     </Card>
//   );
// };

//  */}

{
  /* <form
              className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-accent" x-chunk="dashboard-03-chunk-1"
            >
              <Label htmlFor="message" className="sr-only">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              />
              <div className="flex justify-between items-center p-3 pt-0">
                <div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Paperclip className="size-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <ImageIcon className="size-4" />
                        <span className="sr-only">Attach Image</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach Image</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Mic className="size-4" />
                        <span className="sr-only">Use Microphone</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                  </Tooltip>
                </div>
                <div>
                  <Button round type="submit" className="text-sm ml-auto rounded-full gap-1.5 text-white flex justify-end bg-accent hover:bg-highlight">
                    <FiSend className="size-3.5" />
                  </Button>
                </div>

              </div>
            </form> */
}
