import React, { useState } from 'react';
import { BookOpen, Plus, Calendar, MapPin, Users, Cloud } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { investigationNotes } from '../data/mock';

const ParaNotebookScreen = ({ onBack }) => {
  const [notes] = useState(investigationNotes);
  const [selectedNote, setSelectedNote] = useState(null);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const EvidenceBadge = ({ evidence }) => {
    const getColor = (evidence) => {
      if (evidence.toLowerCase().includes('sls')) return 'bg-green-600';
      if (evidence.toLowerCase().includes('evp')) return 'bg-purple-600';
      if (evidence.toLowerCase().includes('emf')) return 'bg-yellow-600';
      if (evidence.toLowerCase().includes('temperature')) return 'bg-blue-600';
      return 'bg-gray-600';
    };

    return (
      <Badge className={`${getColor(evidence)} text-white text-xs`}>
        {evidence}
      </Badge>
    );
  };

  if (selectedNote) {
    return (
      <div className="min-h-screen bg-black text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-900/50">
          <Button onClick={() => setSelectedNote(null)} variant="ghost" className="text-white">
            ← Back
          </Button>
          <h1 className="text-lg font-bold">Investigation Details</h1>
          <Button variant="ghost" className="text-white">
            Edit
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Title and Date */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-blue-400 mb-2">{selectedNote.title}</h2>
            <div className="flex items-center justify-center space-x-4 text-gray-400">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(selectedNote.date)}
              </div>
              <div className="flex items-center">
                <span className="w-4 h-4 mr-1">🕐</span>
                {selectedNote.time}
              </div>
            </div>
          </div>

          {/* Location */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <MapPin className="w-5 h-5 text-red-400 mr-2" />
                <span className="font-semibold">Location</span>
              </div>
              <p className="text-gray-300">{selectedNote.location}</p>
            </CardContent>
          </Card>

          {/* Team */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Users className="w-5 h-5 text-green-400 mr-2" />
                <span className="font-semibold">Investigation Team</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedNote.team.map((member, index) => (
                  <Badge key={index} className="bg-green-600/20 text-green-400 border border-green-600/30">
                    {member}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weather */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <Cloud className="w-5 h-5 text-blue-400 mr-2" />
                <span className="font-semibold">Weather Conditions</span>
              </div>
              <p className="text-gray-300">{selectedNote.weather}</p>
            </CardContent>
          </Card>

          {/* Notes */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Investigation Notes</h3>
              <p className="text-gray-300 leading-relaxed">{selectedNote.notes}</p>
            </CardContent>
          </Card>

          {/* Evidence */}
          <Card className="bg-gray-900/50 border-gray-700">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Evidence Collected</h3>
              <div className="space-y-2">
                {selectedNote.evidence.map((evidence, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <EvidenceBadge evidence={evidence} />
                    <span className="ml-2 text-gray-300">{evidence}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900/50">
        <Button onClick={onBack} variant="ghost" className="text-white">
          ← Back
        </Button>
        <h1 className="text-lg font-bold">ParaNotebook</h1>
        <Button variant="ghost" className="text-blue-400">
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Investigation List */}
      <div className="p-4 space-y-4">
        <div className="text-center mb-6">
          <BookOpen className="w-12 h-12 text-blue-400 mx-auto mb-2" />
          <p className="text-gray-400">Investigation Records</p>
        </div>

        {notes.map((note) => (
          <Card 
            key={note.id} 
            className="bg-gray-900/50 border-gray-700 hover:border-gray-600 cursor-pointer transition-colors"
            onClick={() => setSelectedNote(note)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-blue-400">{note.title}</h3>
                <span className="text-xs text-gray-400">{formatDate(note.date)}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center text-sm text-gray-400 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {note.location}
                <span className="mx-2">•</span>
                {note.time}
              </div>
              
              <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                {note.notes}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {note.evidence.slice(0, 3).map((evidence, index) => (
                  <EvidenceBadge key={index} evidence={evidence} />
                ))}
                {note.evidence.length > 3 && (
                  <Badge className="bg-gray-600 text-white text-xs">
                    +{note.evidence.length - 3} more
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ParaNotebookScreen;