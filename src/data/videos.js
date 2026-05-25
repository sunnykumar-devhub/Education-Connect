/**
 * Mock video database holding course lectures and tutorial videos
 * for the Education-Connect streaming platform catalog.
 * Uses Google Drive video links mapped through the embed parser.
 */
export const VIDEOS = [
  {
    id: "lecture_math_quad",
    title: "Mastering Quadratic Equations & Formulas",
    description: "A comprehensive lead lecture diving into factorization, completing the square, and using the quadratic formula to solve complex expressions step-by-step.",
    url: "https://drive.google.com/file/d/1hfzhL4Adwi6hOWZhmaDtJPyd83n0CmZt/view?usp=sharing", // using directory file placeholder
    duration: 1840, // 30 mins
    instructor: "Dr. Ananya Sharma",
    category: "Mathematics",
    grade: "Class 10",
    views: "24.5k views",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "lecture_sci_photosynth",
    title: "Photosynthesis: Light Reactions and Calvin Cycle",
    description: "Deep dive into chloroplast architecture, photon absorption in chlorophyll, light-dependent reactions, and carbon fixation cycles.",
    url: "https://drive.google.com/file/d/1BHP_4p360S_dummy_photosynth/view",
    duration: 2450, // 40 mins
    instructor: "Prof. Rajesh Varma",
    category: "Science",
    grade: "Class 9",
    views: "18.2k views",
    thumbnail: "https://images.unsplash.com/photo-1471086569966-db3eebc25a59?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "lecture_hist_nationalism",
    title: "The Rise of Nationalism in Europe",
    description: "Explore the socio-political movements of 19th century Europe, the French Revolution impact, and the unification processes of Italy and Germany.",
    url: "https://drive.google.com/file/d/1DFJ12mq3_dummy_nationalism/view",
    duration: 3100, // 51 mins
    instructor: "Mrs. Sarah Thomas",
    category: "History",
    grade: "Class 10",
    views: "14.8k views",
    thumbnail: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "tutorial_admin_portal",
    title: "How to Navigate Your Student Portal & Library",
    description: "Watch this modern tutorial walk-through explaining how to browse text materials, filter subject catalogs, and customize responsive readers.",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", // direct HTML5 mp4 fallback
    duration: 154, // 2m 34s
    instructor: "Education Connect Support",
    category: "Tutorials",
    grade: "All Grades",
    views: "8.9k views",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "lecture_math_trig",
    title: "Introduction to Trigonometric Ratios & Identities",
    description: "Learn basic trigonometric functions, right-angled triangle proofs, and memorization tips for the standard unit circle ratios.",
    url: "https://drive.google.com/file/d/1C6ygYGNN_dummy_trig/view",
    duration: 1520, // 25 mins
    instructor: "Dr. Ananya Sharma",
    category: "Mathematics",
    grade: "Class 9",
    views: "31.1k views",
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "lecture_sci_electromag",
    title: "Electromagnetic Induction & Faraday's Law",
    description: "A comprehensive high-school physics lecture demonstrating magnetic flux, induced electromotive force (EMF), and Lenz's law logic.",
    url: "https://drive.google.com/file/d/1Dh_SA6gh_dummy_electromag/view",
    duration: 2100, // 35 mins
    instructor: "Prof. Rajesh Varma",
    category: "Science",
    grade: "Class 10",
    views: "19.6k views",
    thumbnail: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=2070&auto=format&fit=crop"
  }
];
