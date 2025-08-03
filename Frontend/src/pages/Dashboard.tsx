import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { SpotCard } from '@/components/spots/SpotCard';
import { SpotFilters } from '@/components/spots/SpotFilters';
import { spotService } from '@/services/spotService';
import { Spot, SpotFilters as ISpotFilters } from '@/types';
import { Plus, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Dashboard = () => {
  const [spots, setSpots] = useState<Spot[]>([]);
  const [filters, setFilters] = useState<ISpotFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSpots();
  }, [filters]);

  const loadSpots = async () => {
    try {
      setIsLoading(true);
      const data = await spotService.getSpots(filters);
      setSpots(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load spots. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Skate Spots</h1>
            <p className="text-muted-foreground">
              Discover amazing places to skate around the world
            </p>
          </div>
          <Button asChild className="shrink-0">
            <Link to="/spots/create">
              <Plus className="w-4 h-4 mr-2" />
              Add New Spot
            </Link>
          </Button>
        </div>

        <SpotFilters filters={filters} onFiltersChange={setFilters} />

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : spots.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 skate-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No spots found</h3>
              <p className="text-muted-foreground mb-4">
                {Object.values(filters).some(Boolean)
                  ? 'Try adjusting your filters or be the first to add a spot in this area.'
                  : 'Be the first to add a skate spot to the community!'}
              </p>
              <Button asChild>
                <Link to="/spots/create">Add the first spot</Link>
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {spots.map((spot) => (
              <SpotCard key={spot.id} spot={spot} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};