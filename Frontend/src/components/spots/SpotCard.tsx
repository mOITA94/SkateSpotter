import { Spot } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Edit, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';

interface SpotCardProps {
  spot: Spot;
}

export const SpotCard = ({ spot }: SpotCardProps) => {
  const { user } = useAuthStore();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'BEGINNER': return 'bg-green-500';
      case 'INTERMEDIATE': return 'bg-yellow-500';
      case 'ADVANCED': return 'bg-orange-500';
      case 'EXPERT': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 animate-slide-in">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={spot.imageUrl}
          alt={spot.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge className={`${getDifficultyColor(spot.difficulty)} text-white`}>
            {spot.difficulty}
          </Badge>
        </div>
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-white text-sm">{spot.rating.toFixed(1)}</span>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {spot.name}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {spot.location}
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">
            {spot.description}
          </p>

          <div className="flex items-center justify-between">
            <Badge variant="secondary">{spot.surface}</Badge>
            <span className="text-xs text-muted-foreground">
              by {spot.createdBy.name}
            </span>
          </div>

          <div className="flex gap-2 pt-2">
            {spot.locationUrl && (
              <Button size="sm" variant="outline" asChild>
                <a
                  href={spot.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Maps
                </a>
              </Button>
            )}
            
            {user?.id === spot.createdBy.id && (
              <Button size="sm" variant="outline" asChild>
                <Link to={`/spots/${spot.id}/edit`} className="flex-1">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};