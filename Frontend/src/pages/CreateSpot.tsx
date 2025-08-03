import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layout } from '@/components/layout/Layout';
import { spotService } from '@/services/spotService';
import { DIFFICULTY_OPTIONS, SURFACE_OPTIONS } from '@/utils/constants';
import { ArrowLeft, Upload, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const createSpotSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be less than 500 characters'),
  location: z.string().min(1, 'Location is required').max(200, 'Location must be less than 200 characters'),
  locationUrl: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  surface: z.string().min(1, 'Surface is required'),
  difficulty: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
  image: z
    .any()
    .refine((files) => files?.length === 1, 'Image is required')
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      'Max file size is 5MB'
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported'
    ),
});

type CreateSpotForm = z.infer<typeof createSpotSchema>;

export const CreateSpot = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateSpotForm>({
    resolver: zodResolver(createSpotSchema),
  });

  const watchedImage = watch('image');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('image', e.target.files as any);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CreateSpotForm) => {
    try {
      setIsLoading(true);
      await spotService.createSpot({
        ...data,
        locationUrl: data.locationUrl || undefined,
        image: data.image[0],
      });
      
      toast({
        title: 'Success!',
        description: 'Spot created successfully.',
      });
      
      navigate('/spots');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Failed to create spot. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/spots">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Spots
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Add New Spot</h1>
            <p className="text-muted-foreground">Share an awesome skate spot with the community</p>
          </div>
        </div>

        <Card className="animate-slide-in">
          <CardHeader>
            <CardTitle>Spot Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  placeholder="e.g., Downtown Skate Plaza"
                  {...register('name')}
                  className={errors.name ? 'border-destructive' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the spot, what makes it special, any obstacles or features..."
                  rows={4}
                  {...register('description')}
                  className={errors.description ? 'border-destructive' : ''}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty *</Label>
                  <Select onValueChange={(value) => setValue('difficulty', value as any)}>
                    <SelectTrigger className={errors.difficulty ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      {DIFFICULTY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.difficulty && (
                    <p className="text-sm text-destructive">{errors.difficulty.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="surface">Surface *</Label>
                  <Select onValueChange={(value) => setValue('surface', value)}>
                    <SelectTrigger className={errors.surface ? 'border-destructive' : ''}>
                      <SelectValue placeholder="Select surface type" />
                    </SelectTrigger>
                    <SelectContent>
                      {SURFACE_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.surface && (
                    <p className="text-sm text-destructive">{errors.surface.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., Downtown LA, Venice Beach, etc."
                  {...register('location')}
                  className={errors.location ? 'border-destructive' : ''}
                />
                {errors.location && (
                  <p className="text-sm text-destructive">{errors.location.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="locationUrl">Google Maps URL (optional)</Label>
                <Input
                  id="locationUrl"
                  type="url"
                  placeholder="https://maps.google.com/..."
                  {...register('locationUrl')}
                  className={errors.locationUrl ? 'border-destructive' : ''}
                />
                {errors.locationUrl && (
                  <p className="text-sm text-destructive">{errors.locationUrl.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Photo *</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  {imagePreview ? (
                    <div className="space-y-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="mx-auto rounded-lg max-h-48 object-cover"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image')?.click()}
                      >
                        Change Image
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload a photo of the spot
                        </p>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('image')?.click()}
                        >
                          Choose File
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                {errors.image && (
                  <p className="text-sm text-destructive">{String(errors.image.message)}</p>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Spot...
                    </>
                  ) : (
                    'Create Spot'
                  )}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link to="/spots">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};