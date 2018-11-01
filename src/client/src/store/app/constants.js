export const TOPICS_REQUEST = "TOPICS_REQUEST";
export const TOPICS_SUCCESS = "TOPICS_SUCCESS";
export const TOPICS_FAILURE = "TOPICS_FAILURE";

export const TOPICS_HIERARCHY_REQUEST = "TOPICS_HIERARCHY_REQUEST";
export const TOPICS_HIERARCHY_SUCCESS = "TOPICS_HIERARCHY_SUCCESS";
export const TOPICS_HIERARCHY_FAILURE = "TOPICS_HIERARCHY_FAILURE";

// User roles defined in the system
export const USER_ROLE_SUBSCRIBER = "viewer";
export const USER_ROLE_CREATOR = "streamer";
export const IS_USER_CREATOR_LEGACY = function(role) {
  return role && (role === USER_ROLE_CREATOR || role === "both");
};

// Maximum number of subcategories the user can choose to learn
export const MAX_WANT_TO_LEARN = 9;

// Maximum number of characters the user can enter in <input> field
export const MAX_LENGTH_LIMIT = 96;

// Maximum number of characters the user can enter in <textarea> field
export const MAX_TEXTAREA_LENGTH_LIMIT = 500;

// Maximum number of projects per page to paginate
export const MAX_PROJECTS_PER_PAGE = 20;
export const MAX_PROJECT_REQUESTS_PER_PAGE = 10;

// Maximum number of visible pagination links
// i.e. 3 means: 1, 2, 3, ... totalCount
export const MAX_VISIBLE_PAGES = 10;

// Directory filter options
export const DIFFICULTY_FILTER_OPTIONS = [
  { value: 1, label: "Beginner", route: "beginner" },
  { value: 2, label: "Intermediate", route: "intermediate" },
  { value: 3, label: "Expert", route: "expert" }
];
export const ORDERING_FILTER_OPTIONS = [
  { value: "-views_overall", label: "Most Popular", route: "popular" },
  { value: "-videos_last_update,-created", label: "Latest", route: "latest" }
];
export const REQUESTS_ORDERING_FILTER_OPTIONS = [
  { value: "-num_vote_up", label: "Most Popular", route: "popular" },
  { value: "-timestamp,-num_vote_up", label: "Latest", route: "latest" }
];
export const LANGUAGE_FILTER_OPTIONS = [
  { value: "en", label: "English", route: "english" },
  { value: "ru", label: "Russian", route: "russian" }
];
