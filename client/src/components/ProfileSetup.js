import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileSetup = () => {
  const [formData, setFormData] = useState({
    bio: '',
    jobTitle: '',
    company: '',
    yearsOfExperience: '',
    areasOfExpertise: '',
    availability: '',
    mentoringPreferences: '',
    linkedinProfile: '',
    achievements: '',
    certifications: '',
    currentJobTitle: '',
    desiredJobTitle: '',
    shortTermGoals: '',
    longTermGoals: '',
    learningPreferences: '',
    areasSeekingGuidance: '',
    currentSkills: '',
    skillsToDevelop: '',
    education: '',
    interests: '',
  });

  const [role, setRole] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const res = await axios.get('/api/profile/me', {
          headers: {
            'x-auth-token': token,
          },
        });

        setFormData({
          bio: res.data.bio || '',
          jobTitle: res.data.jobTitle || '',
          company: res.data.company || '',
          yearsOfExperience: res.data.yearsOfExperience || '',
          areasOfExpertise: res.data.areasOfExpertise || '',
          availability: res.data.availability || '',
          mentoringPreferences: res.data.mentoringPreferences || '',
          linkedinProfile: res.data.linkedinProfile || '',
          achievements: res.data.achievements || '',
          certifications: res.data.certifications || '',
          currentJobTitle: res.data.currentJobTitle || '',
          desiredJobTitle: res.data.desiredJobTitle || '',
          shortTermGoals: res.data.shortTermGoals || '',
          longTermGoals: res.data.longTermGoals || '',
          learningPreferences: res.data.learningPreferences || '',
          areasSeekingGuidance: res.data.areasSeekingGuidance || '',
          currentSkills: res.data.currentSkills || '',
          skillsToDevelop: res.data.skillsToDevelop || '',
          education: res.data.education || '',
          interests: res.data.interests || '',
        });

        setRole(res.data.user.role);
      } catch (err) {
        console.error(err.response ? err.response.data : err.message);
      }
    };

    fetchProfile();
  }, []);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const endpoint = role === 'mentor' ? '/api/profile/mentor' : '/api/profile/mentee';
      const res = await axios.post(endpoint, formData, {
        headers: {
          'x-auth-token': token,
        },
      });
      console.log('Profile updated', res.data);
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
    }
  };

  return (
    <form onSubmit={onSubmit} className="max-w-md mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-6">Profile Setup</h2>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-muted">Bio</label>
        <input type="text" name="bio" value={formData.bio} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Bio" required />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-muted">Job Title</label>
        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Job Title" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-muted">Company</label>
        <input type="text" name="company" value={formData.company} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Company" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-muted">Years of Experience</label>
        <input type="text" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Years of Experience" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-muted">Areas of Expertise</label>
        <input type="text" name="areasOfExpertise" value={formData.areasOfExpertise} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Areas of Expertise" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-muted">Availability</label>
        <input type="text" name="availability" value={formData.availability} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Availability" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-muted">Mentoring Preferences</label>
        <input type="text" name="mentoringPreferences" value={formData.mentoringPreferences} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Mentoring Preferences" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-muted">LinkedIn Profile</label>
        <input type="text" name="linkedinProfile" value={formData.linkedinProfile} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="LinkedIn Profile" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-muted">Achievements</label>
        <input type="text" name="achievements" value={formData.achievements} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Achievements" />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2 text-muted">Certifications</label>
        <input type="text" name="certifications" value={formData.certifications} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Certifications" />
      </div>
      {role === 'mentee' && (
        <>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-muted">Current Job Title</label>
            <input type="text" name="currentJobTitle" value={formData.currentJobTitle} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Current Job Title" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-muted">Desired Job Title</label>
            <input type="text" name="desiredJobTitle" value={formData.desiredJobTitle} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Desired Job Title" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-muted">Short-Term Goals</label>
            <input type="text" name="shortTermGoals" value={formData.shortTermGoals} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Short-Term Goals" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-muted">Long-Term Goals</label>
            <input type="text" name="longTermGoals" value={formData.longTermGoals} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Long-Term Goals" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-muted">Learning Preferences</label>
            <input type="text" name="learningPreferences" value={formData.learningPreferences} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Learning Preferences" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-muted">Areas Seeking Guidance</label>
            <input type="text" name="areasSeekingGuidance" value={formData.areasSeekingGuidance} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Areas Seeking Guidance" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-muted">Current Skills</label>
            <input type="text" name="currentSkills" value={formData.currentSkills} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Current Skills" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-muted">Skills to Develop</label>
            <input type="text" name="skillsToDevelop" value={formData.skillsToDevelop} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Skills to Develop" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-muted">Education</label>
            <input type="text" name="education" value={formData.education} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Education" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-muted">Interests</label>
            <input type="text" name="interests" value={formData.interests} onChange={onChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-primary" placeholder="Interests" />
          </div>
        </>
      )}
      <button type="submit" className="w-full bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring">Update Profile</button>
    </form>
  );
};

export default ProfileSetup;
