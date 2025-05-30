export interface Image {
  id: number;
  imageUrl: string;
  property_id: number;
  created_at: string;
  updated_at: string;
}

export interface Amenity {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  pivot?: {
    property_id: number;
    amenity_id: number;
  };
}

export interface Property {
  id: number;
  title: string;
  address: string;
  city: string;
  landArea: number;
  price: number;
  bedroom: number;
  bathroom: number;
  parking: number;
  longDescreption: string;
  shortDescreption: string;
  constructionArea: number;
  livingArea: number;
  property_listing_id: number;
  property_type_id: number;
  user_id: number;
  purchase_id: number;
  available: number;
  created_at: string;
  updated_at: string;
  images: Image[];
  amenities: Amenity[];
}
