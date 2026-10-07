import React ,{useEffect,useState} from 'react'
import { useGlobalContext } from '@/context/globalContext'
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { X  } from 'lucide-react';
import { Badge } from '../ui/badge';

const RECOMMENDED_SKILLS = ["JavaScript", "TypeScript", "React", "Node.js", "Python", "Java", "Docker", "AWS", "SQL", "UI/UX"];
const RECOMMENDED_TAGS = ["Frontend", "Backend", "Full Stack", "DevOps", "Remote", "Senior", "Junior", "Contract"];

const JobSkills = () => {
    const {skills,  setSkills,tags, setTags} = useGlobalContext();
    const [newSkill, setNewSkill] = React.useState('');
    const [newTag, setNewTag] = React.useState('');
    
    const handleAddSkill=(skill: string)=>{
      const s = skill.trim();
      if(s && !skills.includes(s)){
        setSkills((prev:string)=>[...prev,s]);
        setNewSkill('');
      }
    }
 const  handleRemoveSkill=(skilltoRmeove:string)=>{
      setSkills(skills.filter((s:string)=>s!==skilltoRmeove));
    }
    const handleAddTag=(tag: string)=>{
      const t = tag.trim();
      if(t && !tags.includes(t)){
        setTags((prev:string)=>[...prev,t]);
        setNewTag('');
      }
    }
 const  handleRemoveTag=(tagtoRmeove:string)=>{
      setTags(tags.filter((s:string)=>s!==tagtoRmeove));
    }
    return (
        <div className="p-6 flex flex-col gap-4 bg-background border border-border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Skills</h3>
              <Label
                htmlFor="skills"
                className="text-sm text-muted-foreground mt-2"
              >
                Add relevant skills for the job position.
              </Label>
              
              <div className="mt-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">Recommended</p>
                <div className="flex flex-wrap gap-1.5">
                  {RECOMMENDED_SKILLS.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleAddSkill(skill)}
                      disabled={skills.includes(skill)}
                      className={`px-2 py-1 text-xs rounded-md border transition-colors ${skills.includes(skill) ? 'opacity-50 cursor-not-allowed bg-accent text-muted-foreground' : 'hover:bg-primary/10 hover:text-primary hover:border-primary/30 bg-secondary text-secondary-foreground'}`}
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
    
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  type="text"
                  id="skills"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleAddSkill(newSkill); } }}
                  className="flex-1"
                  placeholder="Enter a skill"
                />
    
                <Button type="button" onClick={() => handleAddSkill(newSkill)}>
                  Add Skill
                </Button>
              </div>
    
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill: string, index: number) => (
                  <div
                    key={index}
                    className="bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center space-x-1 text-sm font-medium"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-primary-foreground hover:text-white/70 focus:outline-none"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
    
          <Separator className="my-2" />
    
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Tags</h3>
              <Label htmlFor="tags" className="text-sm text-muted-foreground mt-2">
                Add relevant tags for the job position.
              </Label>
              
              <div className="mt-4">
                <p className="text-xs font-medium text-muted-foreground mb-2">Recommended</p>
                <div className="flex flex-wrap gap-1.5">
                  {RECOMMENDED_TAGS.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddTag(tag)}
                      disabled={tags.includes(tag)}
                      className={`px-2 py-1 text-xs rounded-md border transition-colors ${tags.includes(tag) ? 'opacity-50 cursor-not-allowed bg-accent text-muted-foreground' : 'hover:bg-primary/10 hover:text-primary hover:border-primary/30 bg-secondary text-secondary-foreground'}`}
                    >
                      + {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
    
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  type="text"
                  id="tags"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleAddTag(newTag); } }}
                  className="flex-1"
                  placeholder="Enter a tag"
                />
                <Button type="button" onClick={() => handleAddTag(newTag)}>
                  Add Tag
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag: string, index: number) => (
                  <div
                    key={index}
                    className="bg-secondary text-secondary-foreground border border-border px-3 py-1 rounded-full flex items-center space-x-1 text-sm font-medium"
                  >
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-muted-foreground hover:text-destructive focus:outline-none"
                      aria-label={`Remove tag ${tag}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }
    
    export default JobSkills;


