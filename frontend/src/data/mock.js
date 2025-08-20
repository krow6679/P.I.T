// Mock data for the Paranormal Investigation App

export const spiritBoxWords = [
  // Spooky/Scary words
  "darkness", "shadow", "whisper", "cold", "presence", "watching", "behind", "follow", 
  "silent", "breath", "footsteps", "door", "window", "basement", "attic", "mirror",
  "blood", "scream", "pain", "fear", "angry", "lost", "trapped", "help", "leave",
  "danger", "warning", "evil", "demon", "ghost", "spirit", "soul", "death",
  
  // Common words
  "yes", "no", "here", "there", "now", "then", "come", "go", "stay", "move",
  "see", "hear", "feel", "know", "remember", "forget", "family", "home",
  "love", "hate", "friend", "enemy", "child", "mother", "father", "sister", "brother",
  "old", "young", "man", "woman", "boy", "girl", "name", "time", "place", "way",
  "light", "dark", "hot", "cold", "up", "down", "inside", "outside", "before", "after"
];

export const ghostRadarContacts = [
  { id: 1, name: "Unknown Entity", distance: 12.5, bearing: 45, strength: 3, type: "shadow" },
  { id: 2, name: "Residual Energy", distance: 8.2, bearing: 180, strength: 2, type: "energy" },
  { id: 3, name: "Cold Spot", distance: 15.7, bearing: 270, strength: 4, type: "temperature" },
  { id: 4, name: "EMF Anomaly", distance: 6.3, bearing: 90, strength: 5, type: "electromagnetic" }
];

export const investigationNotes = [
  {
    id: 1,
    title: "Abandoned Hospital - East Wing",
    date: "2024-12-15",
    time: "23:30",
    location: "Room 205",
    notes: "Strong EMF readings detected near the old surgical equipment. Temperature dropped 15°F suddenly.",
    evidence: ["SLS detection at 23:45", "EVP recorded", "Unexplained footsteps"],
    weather: "Clear, 45°F",
    team: ["Sarah M.", "Mike R.", "Jennifer K."]
  },
  {
    id: 2,
    title: "Victorian Mansion Investigation",
    date: "2024-12-10",
    time: "22:00",
    location: "Master Bedroom",
    notes: "Multiple SLS figures detected. Spirit box session yielded clear responses to questions about the family history.",
    evidence: ["SLS skeleton mapped for 3 minutes", "Spirit box responses", "Cold spots"],
    weather: "Rainy, 38°F",
    team: ["David L.", "Maria S."]
  }
];

export const slsDetections = [
  { id: 1, x: 150, y: 200, confidence: 0.8, timestamp: Date.now() - 1000 },
  { id: 2, x: 300, y: 180, confidence: 0.6, timestamp: Date.now() - 2000 },
  { id: 3, x: 200, y: 250, confidence: 0.9, timestamp: Date.now() - 500 }
];

export const environmentalReadings = {
  temperature: 68.5,
  humidity: 45,
  emf: 2.3,
  barometricPressure: 29.92,
  lastUpdated: new Date().toLocaleTimeString()
};