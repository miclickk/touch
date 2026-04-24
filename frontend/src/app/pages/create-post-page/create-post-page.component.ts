import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { ToastrService } from 'ngx-toastr';

import { CategoryService } from '../../services/category.service';
import { LocationService } from '../../services/location.service';
import { PostService } from '../../services/post.service';

import { Category } from '../../interfaces/category';
import { Location } from '../../interfaces/location';

@Component({
  selector: 'app-create-post-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post-page.component.html',
  styleUrl: './create-post-page.component.css',
})
export class CreatePostPageComponent implements OnInit, AfterViewInit {
  title = '';
  description = '';
  item_type: 'lost' | 'found' = 'lost';
  date_event = '';
  contact_info = '';
  category = '';
  location = '';

  latitude: number | null = null;
  longitude: number | null = null;

  selectedFile: File | null = null;

  // 🔥 ДОБАВИЛИ ЭТО (исправляет ошибку)
  successMessage = '';
  errorMessage = '';

  categories: Category[] = [];
  locations: Location[] = [];

  private map!: L.Map;
  private selectedMarker: L.Marker | null = null;

  constructor(
    private categoryService: CategoryService,
    private locationService: LocationService,
    private postService: PostService,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (data) => (this.categories = data),
    });

    this.locationService.getLocations().subscribe({
      next: (data) => (this.locations = data),
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('create-map').setView([43.2389, 76.8897], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;

      this.latitude = Number(lat.toFixed(6));
      this.longitude = Number(lng.toFixed(6));

      if (this.selectedMarker) {
        this.map.removeLayer(this.selectedMarker);
      }

      this.selectedMarker = L.marker([lat, lng])
        .addTo(this.map)
        .bindPopup(`Lat: ${this.latitude}, Lng: ${this.longitude}`)
        .openPopup();
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.toastr.info('Photo selected 📷');
    }
  }

  createPost(): void {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('item_type', this.item_type);
    formData.append('date_event', this.date_event);
    formData.append('contact_info', this.contact_info);
    formData.append('category', this.category);
    formData.append('location', this.location);

    if (this.latitude !== null) {
      formData.append('latitude', String(this.latitude));
    }

    if (this.longitude !== null) {
      formData.append('longitude', String(this.longitude));
    }

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.postService.createPost(formData).subscribe({
      next: () => {
        this.successMessage = 'Post created successfully';
        this.toastr.success('Post created successfully ');
        this.router.navigate(['/posts']);
      },
      error: () => {
        this.errorMessage = 'Failed to create post';
        this.toastr.error('Failed to create post ');
      },
    });
  }
}
