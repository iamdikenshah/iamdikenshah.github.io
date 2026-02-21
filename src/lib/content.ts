/**
 * Central content import.
 * All site data lives in /public/content.json.
 * Import what you need from here — update content.json to change any text,
 * links, or data without touching component code.
 */
import contentData from "../../public/content.json";

export default contentData;

export const {
  metadata,
  personalInfo,
  navigation,
  hero,
  about,
  expertise,
  certifications,
  skills,
  experience,
  projects,
  blog,
  contact,
  cta,
  footer,
} = contentData;
