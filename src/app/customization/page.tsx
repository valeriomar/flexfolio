"use client";

import { useEffect, useState } from "react";
import { Lock, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import ImageUploader from "@/components/ui/ImageUploader";



interface Hero {
  name: string;
  title: string;
  tagline: string;
}

interface About {
  paragraph: string;
}

interface SiteMetadata {
  title: string;
  description: string;
  keywords: string;
}

interface AboutMe {
  name: string;
  surname: string;
  photo: string;
  bio: string;
  socials: Record<string, string>;
  tools: Record<string, boolean>;
  languages: Record<string, { spoken: string; written: string }>;
}

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  categories: string[];
  behanceUrl: string;
}

interface Projects {
  title: string;
  subtitle: string;
  items: ProjectItem[];
}

interface FormData {
  hero: {
    name: string;
    title: string;
    tagline: string;
  };
  about: {
    paragraph: string;
  };
  aboutMe: {
    name: string;
    surname: string;
    photo: string;
    bio: string;
    socials: Record<string, string>;
    tools: Record<string, boolean>;
    languages: Record<string, { spoken: string; written: string }>;
  };
  projects: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      description: string;
      image: string;
      categories: string[];
      behanceUrl: string;
    }[];
  };
  contact?: {
    emailFromName: string;
    emailFromAddress: string;
    emailTo: string;
  };
  siteMetadata: {
    title: string;
    description: string;
    keywords: string;
  };
  themeSettings: {
    defaultTheme: string;
    allowFrontendThemeSwitch: boolean;
  };
  site: {
    authorName: string;
  };
}


const TOOL_LIST = [
  "Photoshop", "Illustrator", "AfterEffects", "PremierePro", "Figma", "Blender",
  "Cinema4D", "Sketch", "XD", "Framer", "React", "NextJS", "Tailwind", "HTML",
  "CSS", "JavaScript", "TypeScript", "Python", "GitHub", "Git", "Vite",
  "Webpack", "Postman", "Jira", "Slack", "Notion", "Bootstrap", "Sass",
  "GIMP", "Inkscape", "AffinityDesigner", "AffinityPhoto", "Unreal", "Unity",
  "Netlify", "Vercel", "Docker", "Firebase", "MongoDB", "MySQL", "AWS",
  "NodeJS"
];

const LANGUAGE_OPTIONS = [
  "English", "Spanish", "Italian", "French", "German", "Portuguese", "Dutch",
  "Russian", "Chinese", "Japanese", "Korean", "Arabic", "Hindi", "Turkish"
];

const THEME_LIST = {
  pulseRose: {
    label: "Pulse Rose",
    primary: "#e11d48",
    background: "#fff0f5",
    text: "#4c0519",
    subtext: "#db2777",
    gradient: "conic-gradient(from 220deg at 50% 50%, #fff0f5, #f9a8d4, #f472b6, #e11d48, #fff0f5)"
  },
  opalGlow: {
    label: "Opal Glow",
    primary: "#38bdf8",
    background: "#e0f2fe",
    text: "#083344",
    subtext: "#0ea5e9",
    gradient: "conic-gradient(from 90deg at 50% -5%, #bae6fd, #fcd5ce, #fef9c3, #ddd6fe, #bae6fd)"
  },
  twilightAura: {
    label: "Twilight Aura",
    primary: "#9333ea",
    background: "#1e1b4b",
    text: "#f3e8ff",
    subtext: "#d8b4fe",
    gradient: "conic-gradient(from 0deg at 50% -10%, #312e81, #1e1b4b, #4c1d95, #9333ea, #312e81)"
  },
  cottonField: {
    label: "Cotton Field",
    primary: "#8b5cf6",
    background: "#f5f3ff",
    text: "#3b0764",
    subtext: "#6d28d9",
    gradient: "conic-gradient(from 45deg at 50% 00%, #f3e8ff, #e0f2fe, #fce7f3, #f5f3ff)"
  },
  mistForest: {
    label: "Mist Forest",
    primary: "#22c55e",
    background: "#e0fdf4",
    text: "#022c22",
    subtext: "#16a34a",
    gradient: "conic-gradient(from 200deg at 0% 50%, #ecfdf5, #bbf7d0, #86efac, #ccfbf1, #ecfdf5)"
  },
  arcticSun: {
    label: "Arctic Sun",
    primary: "#3b82f6",
    background: "#eff6ff",
    text: "#1e3a8a",
    subtext: "#1e3a8a",
    gradient: "conic-gradient(from 120deg at 50% 5%, #e0f2fe, #fef9c3, #fbcfe8, #e0f2fe)"
  },
  lavenderSmoke: {
    label: "Lavender Smoke",
    primary: "#c084fc",
    background: "#f3e8ff",
    text: "#4c1d95",
    subtext: "#a78bfa",
    gradient: "conic-gradient(from 30deg at 50% 0%, #f3e8ff, #ede9fe, #ddd6fe, #f3e8ff)"
  },
  melonHaze: {
    label: "Melon Haze",
    primary: "#fb923c",
    background: "#fff7ed",
    text: "#78350f",
    subtext: "#ea580c",
    gradient: "conic-gradient(from 60deg at 50% 80%, #fff7ed, #fed7aa, #fdba74, #ffe4e6, #fff7ed)"
  },
  lunarAsh: {
    label: "Lunar Ash",
    primary: "#94a3b8",
    background: "#1e293b",
    text: "#f1f5f9",
    subtext: "#e2e8f0",
    gradient: "conic-gradient(from 180deg at 50% 50%, #0f172a, #1e293b, #334155, #64748b, #0f172a)"
  },
  electricBloom: {
    label: "Electric Bloom",
    primary: "#ec4899",
    background: "#0f172a",
    text: "#f9a8d4",
    subtext: "#7e22ce",
    gradient: "conic-gradient(from 240deg at 50% 50%, #0f172a, #1e40af, #7e22ce, #ec4899, #0f172a)"
  },
  rustBloom: {
    label: "Rust Bloom",
    primary: "#b91c1c",
    background: "#fef3c7",
    text: "#3b0a0a",
    subtext: "#9a3412",
    gradient: "conic-gradient(from 135deg at 50% 50%, #fef3c7, #fde68a, #fcd34d, #fecaca, #fef3c7)"
  },
  neonAcidDark: {
    label: "Neon Acid Dark",
    primary: "#a3e635",
    background: "#0f172a",
    text: "#d9f99d",
    subtext: "#bef264",
    gradient: "conic-gradient(from 280deg at 50% 50%, #0f172a, #1e293b, #1e40af, #0f172a)"
  }
};

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2", "Native"];


const DEFAULT_STRUCTURE: FormData = {
  hero: { name: "", title: "", tagline: "" },
  about: { paragraph: "" },
  aboutMe: {
    name: "",
    surname: "",
    photo: "",
    bio: "",
    socials: {},
    tools: Object.fromEntries(TOOL_LIST.map(tool => [tool, false])),
    languages: {}
  },
  projects: {
    title: "",
    subtitle: "",
    items: []
  },
  contact: {
    emailFromName: "",
    emailFromAddress: "",
    emailTo: ""
  },
  siteMetadata: {
    title: "",
    description: "",
    keywords: ""
  },
  themeSettings: {
    defaultTheme: "rustBloom",
    allowFrontendThemeSwitch: true,
  },
  site: {
    authorName: ""
  }
};


export default function CustomizationPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [formData, setFormData] = useState<FormData>(DEFAULT_STRUCTURE);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [email, setEmail] = useState("")


  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await fetch("/api/load-content");
      const data = await res.json();
        console.log("Loaded content:", data);

      if (res.ok && data?.content) {
        console.log("Loaded content:", data.content);
        setFormData(prev => ({ ...prev, ...data.content }));
      } else {
        console.warn("No content found in Edge Config");
      }
    } catch (error) {
      console.error("Failed to load initial data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("https://flexfolio-keygen.vercel.app/api/verify-key", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: password.trim(), email: email.trim() }),
    });

    const data = await res.json();

    if (res.ok && data.valid) {
      setAuthenticated(true);
    } else {
      alert("Invalid or already used key");
    }
  } catch (err) {
    console.error("Key verification failed:", err);
    alert("There was an error verifying your key.");
  }
};

      const handleChange = (section: keyof FormData, field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value
      }
    }));
  };

  const handleToolToggle = (tool: string) => {
    setFormData(prev => ({
      ...prev,
      aboutMe: {
        ...prev.aboutMe,
        tools: {
          ...prev.aboutMe.tools,
          [tool]: !prev.aboutMe.tools[tool]
        }
      }
    }));
  };

  const handleLanguageChange = (
    lang: string,
    type: "spoken" | "written",
    level: string
  ) => {
    setFormData(prev => ({
      ...prev,
      aboutMe: {
        ...prev.aboutMe,
        languages: {
          ...prev.aboutMe.languages,
          [lang]: {
            ...prev.aboutMe.languages[lang],
            [type]: level
          }
        }
      }
    }));
  };

 const updateProject = (index: number, field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedProjects: any = [...formData.projects.items];
    if (field === "categories") {
      updatedProjects[index][field] = e.target.value.split(",").map((c) => c.trim());
    } else {
      updatedProjects[index][field] = e.target.value;
    }
    setFormData({
      ...formData,
      projects: {
        ...formData.projects,
        items: updatedProjects
      }
    });
  };

  const handleSave = async () => {
    const cleanPayload = {
      themeSettings: formData.themeSettings,
      siteMetadata: formData.siteMetadata,
      hero: formData.hero,
      projects: formData.projects,
      aboutMe: formData.aboutMe,
      contact: formData.contact,
      site: formData.site,
    };

    try {
      const res = await fetch("/api/save-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        password,
        email,
        content: cleanPayload,
        }),

      });

      const data = await res.json();
      if (!res.ok) {
        console.error("Save failed:", data.error || "Unknown error");
        alert("Failed to save. Check console for details.");
      } else {
        alert("Content saved successfully!");
      }
    } catch (error) {
      console.error("Unexpected error while saving:", error);
      alert("Unexpected error occurred.");
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }


  const handleProjectChange = (index: number, field: string, value: string | string[]) => {
    const updatedItems = [...formData.projects.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      projects: {
        ...prev.projects,
        items: updatedItems
      }
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: {
        ...prev.projects,
        items: [
          ...prev.projects.items,
          { title: "", description: "", image: "", categories: [], behanceUrl: "" }
        ]
      }
    }));
  };

  const removeProject = (index: number) => {
    const updatedItems = formData.projects.items.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      projects: {
        ...prev.projects,
        items: updatedItems
      }
    }));
  };

  if (!authenticated) {
    return (
      <div  className=" min-h-screen flex flex-col items-center justify-center bg-white/30 backdrop-blur-md p-6 rounded-xl border border-black/10 ">
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-4 p-8 rounded-xl shadow-md bg-white border border-black/10 "
        >
          <div style={{padding: 30}} className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Enter your email and activation key to customize</h2>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="rounded-full text-center px-4 py-2 border border-black/10  bg-white/70  outline-none"
            />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your activation key"
            className="rounded-full text-center px-4 py-2 border border-black/10  bg-white/70  outline-none"
          />

          <button
            type="submit"
            style={{border: "1px solid", borderColor: "var(--text)", borderRadius: 30, paddingBlock: 4, paddingInline: 10, marginBottom:20}}
            className="rounded-full px-6 py-2 bg-black text-white  hover:opacity-90 transition"
          >
            Enter
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center", padding:20, gap:5}} className="color-important min-h-screen bg-white/30  backdrop-blur-md p-6">
      <div style={{padding:20}} className="max-w-4xl mx-auto bg-white k p-8 rounded-xl border border-black/10  shadow-md">
        <h1 style={{fontSize: 30, fontWeight: 900, paddingBlock: 20}} className="text-3xl font-bold mb-6">Customize Your Portfolio</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Hero */}
            <div className="sm:col-span-2">
                <h3 style={{fontWeight: "900"}} className="font-semibold">Hero Section</h3>

                <div style={{width: "100%", marginBlock: 5}}>
                    <span>Your Name: </span>
                    <input style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "var(--text)", borderRadius: 20, width: "50%"}} className="input text-center" placeholder="Your Name" value={formData.hero.name} onChange={handleChange("hero", "name")} />
                </div>
                <div style={{width: "100%", marginBlock: 5}}>
                    <span>Your Title: </span>
                    <input style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "var(--text)", borderRadius: 20, width: "80%"}} className="input" placeholder="Your Title" value={formData.hero.title} onChange={handleChange("hero", "title")} />
                </div>
                <div style={{width: "100%", marginBlock: 5}}>
                    <span>Tagline: </span>
                    <input style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "var(--text)", borderRadius: 20, width: "70%"}} className="input" placeholder="Tagline" value={formData.hero.tagline} onChange={handleChange("hero", "tagline")} />
                </div>
            </div>

          {/* About Me */}
          <div className="sm:col-span-2">
            <h3 style={{fontWeight: "900"}} className="font-semibold">About Me</h3>
            <div style={{width: "100%", marginBlock: 5}}>
                <span>Your Name: </span>
                <input style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "var(--text)", borderRadius: 20, width: "50%"}} className="input" placeholder="Name" value={formData.aboutMe.name} onChange={handleChange("aboutMe", "name")}  />
            </div>
            <div style={{width: "100%", marginBlock: 5}}>
                <span>Your Surname: </span>
                <input style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "var(--text)", borderRadius: 20, width: "50%"}} className="input" placeholder="Surname" value={formData.aboutMe.surname} onChange={handleChange("aboutMe", "surname")} />
            </div>
            <div style={{width: "100%", marginBlock: 5}}>
                <span>Photo </span>
                <ImageUploader
                  label="Your Profile Photo"
                  value={formData.aboutMe.photo}
                  onChange={(url) =>
                    setFormData((prev) => ({
                      ...prev,
                      aboutMe: {
                        ...prev.aboutMe,
                        photo: url,
                      },
                    }))
                  }
                  shape="circle"
                />
            </div>

            <div style={{width: "100%", marginBlock: 5}}>
                <span style={{width: "100%"}}>Bio (recommended 300/400 words): </span>
                    <div style={{ width: "100%" }}>
                    <textarea
                        style={{
                        paddingInline: 20,
                        paddingBlock: 4,
                        border: "1px solid",
                        borderColor: "var(--text)",
                        borderRadius: 20,
                        width: "100%",
                        }}
                        className="input"
                        rows={6}
                        placeholder="Bio"
                        value={formData.aboutMe.bio}
                        onChange={handleChange("aboutMe", "bio")}
                    />
                    <div style={{ textAlign: "right", fontSize: 12, marginTop: 4, color: "var(--text)" }}>
                        {formData.aboutMe.bio.trim() === ""
                        ? "0"
                        : formData.aboutMe.bio.trim().split(/\s+/).length}{" "}
                        words
                    </div>
                    </div>
            </div>

            <h3 style={{fontWeight: "900"}} className="font-bold">Social Media (leave blank if don't want to display)</h3>
                {Object.keys({
                    behance: "",
                    dribbble: "",
                    facebook: "",
                    github: "",
                    instagram: "",
                    linkedin: "",
                    tiktok: "",
                    twitter: "",
                    youtube: ""
                }).map((platform) => (
                    <div key={platform} className="mb-2">
                    <label className="block font-medium capitalize">{platform}</label>
                    <input
                        className="input w-full"
                        style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "var(--text)", borderRadius: 20, width: "70%"}}
                        placeholder={`https://${platform}.com/yourusername`}
                        value={formData.aboutMe.socials[platform] || ""}
                        onChange={(e) => {
                        setFormData(prev => ({
                            ...prev,
                            aboutMe: {
                            ...prev.aboutMe,
                            socials: {
                                ...prev.aboutMe.socials,
                                [platform]: e.target.value
                            }
                            }
                        }));
                        }}
                    />
                    </div>
                ))}
          </div>

          {/* Projects */}
        <div className="sm:col-span-2 mt-10">
        <h3 style={{fontWeight: 900}} className="font-semibold">Projects</h3>
        <button onClick={addProject} style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "var(--text)", borderRadius: 20, width: "50%"}} className="text-sm text-blue-600 underline mb-4">+ Add Project</button>
        {formData.projects.items.map((project, idx) => (
          <div style={{marginBlock: 10, border: "1px solid", borderColor: "var(--text)", borderRadius: 20, padding: 20}} key={idx} className="border border-black/10 rounded p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 style={{fontWeight: 900}} className="font-semibold">Project {idx + 1}</h4>
              <button
                onClick={() => removeProject(idx)}
                className="text-red-500 hover:text-red-700"
                title="Remove project"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div style={{width: "100%", marginBlock: 5}}>
                <span style={{width: "100%"}}>Title: </span>
                <input style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "#11111155", borderRadius: 20, width: "80%"}} className="input w-full mb-2"
              placeholder="Title"
              value={project.title}
              onChange={(e) => handleProjectChange(idx, "title", e.target.value)}/>
            </div>
            <div style={{width: "100%", marginBlock: 5}}>
                <span style={{width: "100%"}}>Description: </span>
                <textarea style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "#11111155", borderRadius: 20, width: "80%"}} className="input w-full mb-2"
              placeholder="Description"
              value={project.description}
              onChange={(e) => handleProjectChange(idx, "description", e.target.value)}/>
            </div>
            <div style={{width: "100%", marginBlock: 5}}>
                <span style={{width: "100%"}}>Image URL: </span>
                <ImageUploader
                  label="Project Image"
                  value={project.image}
                  onChange={(url) =>
                    setFormData((prev) => {
                      const updated = [...prev.projects.items];
                      updated[idx] = {
                        ...updated[idx],
                        image: url,
                      };
                      return {
                        ...prev,
                        projects: {
                          ...prev.projects,
                          items: updated,
                        },
                      };
                    })
                  }
                  shape="square"
                />
            </div>
            <div style={{width: "100%", marginBlock: 5}}>
                <span style={{width: "100%"}}>Behance URL: </span>
                <input style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "#11111155", borderRadius: 20, width: "80%"}} 
                className="input w-full mb-2"
              placeholder="Behance URL"
              value={project.behanceUrl}
              onChange={(e) => handleProjectChange(idx, "behanceUrl", e.target.value)}/>
            </div>
            <div style={{width: "100%", marginBlock: 5}}>
                <span style={{width: "100%"}}>Categories (comma-separated): </span>
                <input style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "#11111155", borderRadius: 20, width: "80%"}} 
                className="input w-full"
              placeholder="Categories (comma-separated)"
              value={project.categories.join(", ")}
              onChange={(e) => handleProjectChange(idx, "categories", e.target.value.split(",").map(c => c.trim()))}/>
            </div>
          </div>
        ))}
      </div>

          {/* Tools */}
            <div className="sm:col-span-2">
                <h3 style={{fontWeight: 900}} className="font-semibold mt-8">Tools</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {TOOL_LIST.map((tool) => (
                    <label key={tool} className="flex items-center gap-2">
                        <input
                        type="checkbox"
                        checked={formData.aboutMe.tools[tool] || false}
                        onChange={() => handleToolToggle(tool)}
                        />
                        <span>{tool}</span>
                    </label>
                    ))}
                </div>
                </div>

          {/* Languages */}
          <div className="sm:col-span-2 mt-10">
            <h3 style={{ fontWeight: 900 }} className="font-semibold">Languages</h3>

            {/* Add Language Selector */}
            <div className="flex items-center gap-4 mb-4">
                <select
                value={""}
                onChange={(e) => {
                    const selectedLang = e.target.value;
                    if (!selectedLang) return;

                    setFormData(prev => ({
                    ...prev,
                    aboutMe: {
                        ...prev.aboutMe,
                        languages: {
                        ...prev.aboutMe.languages,
                        [selectedLang]: { spoken: "", written: "" },
                        },
                    },
                    }));
                }}
                style={{
                    paddingInline: 20,
                    paddingBlock: 4,
                    border: "1px solid",
                    borderColor: "var(--text)",
                    borderRadius: 20,
                    width: "50%",
                }}
                >
                <option value="">+ Select a language to add</option>
                {LANGUAGE_OPTIONS.filter(lang => !(lang in formData.aboutMe.languages)).map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                ))}
                </select>
            </div>

            {/* Render existing languages */}
            {Object.entries(formData.aboutMe.languages).map(([lang, levels], idx) => (
                <div
                key={lang}
                style={{
                    marginBlock: 10,
                    border: "1px solid",
                    borderColor: "var(--text)",
                    borderRadius: 20,
                    padding: 20,
                }}
                className="border border-black/10 rounded p-4 mb-4"
                >
                <div className="flex justify-between items-center mb-2">
                    <h4 style={{ fontWeight: 900 }} className="font-semibold">{lang}</h4>
                    <button
                    onClick={() => {
                        const updated = { ...formData.aboutMe.languages };
                        delete updated[lang];
                        setFormData(prev => ({
                        ...prev,
                        aboutMe: {
                            ...prev.aboutMe,
                            languages: updated,
                        },
                        }));
                    }}
                    className="text-red-500 hover:text-red-700"
                    title="Remove language"
                    >
                    <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                <div style={{ marginBlock: 5 }}>
                    <span style={{ width: "100%" }}>Spoken level:</span>
                    <select
                    style={{
                        paddingInline: 20,
                        paddingBlock: 4,
                        border: "1px solid",
                        borderColor: "#11111155",
                        borderRadius: 20,
                        width: "80%",
                    }}
                    value={levels.spoken}
                    onChange={(e) => handleLanguageChange(lang, "spoken", e.target.value)}
                    >
                    <option value="">Select</option>
                    {LEVELS.map(level => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                    </select>
                </div>

                <div style={{ marginBlock: 5 }}>
                    <span style={{ width: "100%" }}>Written level:</span>
                    <select
                    style={{
                        paddingInline: 20,
                        paddingBlock: 4,
                        border: "1px solid",
                        borderColor: "#11111155",
                        borderRadius: 20,
                        width: "80%",
                    }}
                    value={levels.written}
                    onChange={(e) => handleLanguageChange(lang, "written", e.target.value)}
                    >
                    <option value="">Select</option>
                    {LEVELS.map(level => (
                        <option key={level} value={level}>{level}</option>
                    ))}
                    </select>
                </div>
                </div>
            ))}
            </div>


          {/* Contact */}
          <div className="sm:col-span-2">
            <h3 style={{ fontWeight: 900 }} className="font-semibold mt-8">Contact</h3>
            <div style={{width: "100%", marginBlock: 5}}>
                <span>From Name: </span>
                <input style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "var(--text)", borderRadius: 20, width: "70%"}} className="input" placeholder="From Name" value={formData.contact?.emailFromName} onChange={handleChange("contact", "emailFromName")}/>
            </div>
            <div style={{width: "100%", marginBlock: 5}}>
                <span>From Email: </span>
                <input style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "var(--text)", borderRadius: 20, width: "70%"}} className="input" placeholder="From Email" value={formData.contact?.emailFromAddress} onChange={handleChange("contact", "emailFromAddress")} />
            </div>
            <div style={{width: "100%", marginBlock: 5}}>
                <span>To Email: </span>
                <input style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "var(--text)", borderRadius: 20, width: "70%"}}  className="input" placeholder="To Email" value={formData.contact?.emailTo} onChange={handleChange("contact", "emailTo")}  />
            </div>
          </div>

          {/* Site Metadata */}
          <div className="sm:col-span-2">
            <h3 style={{ fontWeight: 900 }} className="font-semibold mt-8">Site Metadata</h3>
            <div style={{width: "100%", marginBlock: 5}}>
                <span>Site Title: </span>
                <input style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "var(--text)", borderRadius: 20, width: "70%"}}   className="input" placeholder="Site title" value={formData.siteMetadata.title} onChange={handleChange("siteMetadata", "title")} />
            </div>
            <div style={{width: "100%", marginBlock: 5}}>
                <span>Site Description: </span>
                <textarea style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "var(--text)", borderRadius: 20, width: "70%"}}  className="input" placeholder="Description" value={formData.siteMetadata.description} onChange={handleChange("siteMetadata", "description")} />
            </div>
            <div style={{width: "100%", marginBlock: 5}}>
                <span>Keywords: </span>
                <input style={{paddingInline: 20, paddingBlock: 4, border: "1px solid", borderColor: "var(--text)", borderRadius: 20, width: "70%"}}   className="input" placeholder="Keywords" value={formData.siteMetadata.keywords} onChange={handleChange("siteMetadata", "keywords")}/>
            </div>
          </div>
        </div>
        <div className="p-8 max-w-4xl mx-auto">

      {/* Default Theme */}
      <div className="mb-6">
        <h3 style={{ fontWeight: 900 }} className="text-2xl font-bold mb-4">Theme Settings</h3>
        <p className="font-semibold mb-2">Select a default theme:</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(THEME_LIST).map(([key, theme]) => {
            const isSelected = formData.themeSettings.defaultTheme === key;

            return (
                <label
                key={key}
                onClick={() => setFormData(prev => ({
                    ...prev,
                    themeSettings: {
                    ...prev.themeSettings,
                    defaultTheme: key
                    }
                }))}
                className="cursor-pointer rounded-lg p-4 transition border shadow relative"
                style={{
                    background: theme.gradient,
                    borderColor: isSelected ? "var(--text)" : "#00000022",
                    borderWidth: isSelected ? 2 : 1,
                    color: theme.text,
                    minHeight: 100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center"
                }}
                >
                <input
                    type="radio"
                    name="theme"
                    value={key}
                    checked={isSelected}
                    readOnly
                    className="hidden"
                />
                <span style={{
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    backgroundColor: "",
                    backdropFilter: "blur(4px)",
                    borderRadius: 12,
                    padding: "4px 12px"
                }}>
                    {theme.label}
                </span>
                </label>
            );
            })}
        </div>

        <div className="mt-4 flex items-center gap-3">
            <input
            id="allowSwitch"
            type="checkbox"
            checked={formData.themeSettings.allowFrontendThemeSwitch}
            onChange={handleChange("themeSettings", "allowFrontendThemeSwitch")}
            />
            <label htmlFor="allowSwitch" className="font-medium">
            Allow theme switching from frontend
            </label>
        </div>
        </div>

        </div>

        <button
            onClick={handleSave}
            style={{border: "1px solid", borderColor: "var(--text)", borderRadius: 30, paddingBlock: 4, paddingInline: 10, margin:30}}
            className="rounded-full px-6 py-2 bg-black text-white   hover:opacity-90 transition"
                >
          Save
        </button>

<button
  onClick={() => router.push("/")}
  style={{
    border: "1px solid",
    borderColor: "var(--text)",
    borderRadius: 30,
    paddingBlock: 4,
    paddingInline: 10,
    margin: 30
  }}
  className="rounded-full px-6 py-2 bg-black text-white   hover:opacity-90 transition"
>
  Go to Homepage
</button>
        
      </div>
    </div>
  );
}
