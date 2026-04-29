export type CulturalEvent = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image: string;
  attendees: number;
  description: string;
  highlights: string[];
};

export const culturalEvents: CulturalEvent[] = [
  {
    id: 1,
    title: "Summer Jazz Festival",
    date: "February 20, 2026",
    time: "7:00 PM - 11:00 PM",
    location: "Central Park Amphitheater",
    category: "Concert",
    image:
      "https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1200",
    attendees: 324,
    description:
      "Join us for an unforgettable evening of smooth jazz under the stars. Featuring international artists and local talent.",
    highlights: ["Live performances", "Food trucks", "VIP seating", "Meet artists"],
  },
  {
    id: 2,
    title: "Modern Art Exhibition",
    date: "February 15, 2026",
    time: "10:00 AM - 6:00 PM",
    location: "City Gallery",
    category: "Exhibition",
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=1200",
    attendees: 186,
    description:
      "Explore modern art, installations, and visual experiments created by emerging artists.",
    highlights: ["Modern paintings", "Photo zones", "Artist talks", "Guided tour"],
  },
  {
    id: 3,
    title: "Drama Theater Night",
    date: "March 2, 2026",
    time: "6:30 PM - 9:00 PM",
    location: "City Theater",
    category: "Theater",
    image:
      "https://images.unsplash.com/photo-1503095396549-807759245b35?q=80&w=1200",
    attendees: 210,
    description:
      "A dramatic theater performance with emotional scenes, live acting, and classical stage design.",
    highlights: ["Live acting", "Classic drama", "Comfort seats", "Evening show"],
  },
  {
    id: 4,
    title: "Spring Culture Festival",
    date: "March 10, 2026",
    time: "12:00 PM - 10:00 PM",
    location: "Main Square",
    category: "Festival",
    image:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200",
    attendees: 540,
    description:
      "A city festival with music, food, exhibitions, workshops, and cultural performances.",
    highlights: ["Music stage", "Food court", "Workshops", "Outdoor activities"],
  },
];