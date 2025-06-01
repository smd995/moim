import { Study, Application } from "@/types";

const STORAGE_KEYS = {
  STUDIES: "studies",
  APPLICATIONS: "applications",
} as const;

export const storage = {
  // Studies 관련
  getStudies: (): Study[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEYS.STUDIES);
    return data ? JSON.parse(data) : [];
  },

  saveStudies: (studies: Study[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.STUDIES, JSON.stringify(studies));
  },

  addStudy: (study: Study): void => {
    const studies = storage.getStudies();
    studies.push(study);
    storage.saveStudies(studies);
  },

  getStudyById: (id: string): Study | undefined => {
    const studies = storage.getStudies();
    return studies.find((study) => study.id === id);
  },

  // Applications 관련
  getApplications: (): Application[] => {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(STORAGE_KEYS.APPLICATIONS);
    return data ? JSON.parse(data) : [];
  },

  saveApplications: (applications: Application[]): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(
      STORAGE_KEYS.APPLICATIONS,
      JSON.stringify(applications)
    );
  },

  addApplication: (application: Application): void => {
    const applications = storage.getApplications();
    applications.push(application);
    storage.saveApplications(applications);
  },

  getApplicationsByStudyId: (studyId: string): Application[] => {
    const applications = storage.getApplications();
    return applications.filter((app) => app.studyId === studyId);
  },

  updateApplicationStatus: (
    applicationId: string,
    status: Application["status"]
  ): void => {
    const applications = storage.getApplications();
    const application = applications.find((app) => app.id === applicationId);
    if (application) {
      application.status = status;
      storage.saveApplications(applications);
    }
  },

  // 유틸리티
  generateId: (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  },

  generateHostKey: (): string => {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  },
};
