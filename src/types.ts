/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PrintingServiceItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface PrintingCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  items: PrintingServiceItem[];
}

export interface DigitalServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  details: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'printing' | 'graphic-design' | 'logo' | 'branding' | 'vehicle-wrap' | 'storefront';
  categoryLabel: string;
  image: string;
  description: string;
  client?: string;
  year?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  role?: string;
  rating: number;
  text: string;
  date: string;
  initials: string;
}
