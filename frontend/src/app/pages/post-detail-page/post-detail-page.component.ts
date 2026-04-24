import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';

import { ItemPost } from '../../interfaces/item-post';
import { CommentModel } from '../../interfaces/comment';

@Component({
  selector: 'app-post-detail-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './post-detail-page.component.html',
  styleUrl: './post-detail-page.component.css',
})
export class PostDetailPageComponent implements OnInit {
  post: ItemPost | null = null;
  comments: CommentModel[] = [];
  newComment = '';

  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    public authService: AuthService,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.postService.getPostById(id).subscribe({
      next: (data) => {
        this.post = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load post';
        this.loading = false;
      },
    });

    this.postService.getComments(id).subscribe({
      next: (data) => (this.comments = data),
    });
  }

  addComment(): void {
    if (!this.newComment.trim() || !this.post) return;

    this.postService.addComment(this.post.id, this.newComment).subscribe({
      next: (comment) => {
        this.comments.push(comment);
        this.newComment = '';
        this.toastr.success('Comment added');
      },
      error: () => {
        this.toastr.error('Failed to add comment');
      },
    });
  }

  isOwner(): boolean {
    return this.post?.user === this.authService.currentUser()?.id;
  }

  markResolved(): void {
    if (!this.post) return;

    this.postService
      .patchPost(this.post.id, {
        status: 'resolved',
      })
      .subscribe({
        next: () => {
          this.post!.status = 'resolved';
          this.toastr.success('Marked as resolved');
        },
        error: () => {
          this.toastr.error('Failed to update status');
        },
      });
  }

  claimItem(): void {
    if (!this.post) return;

    this.postService
      .patchPost(this.post.id, {
        status: 'resolved',
      })
      .subscribe({
        next: () => {
          this.post!.status = 'resolved';
          this.toastr.success('Item claimed successfully!');
        },
        error: () => {
          this.toastr.error('Failed to claim item');
        },
      });
  }

  deletePost(): void {
    if (!this.post) return;

    this.postService.deletePost(this.post.id).subscribe({
      next: () => {
        this.toastr.success('Post deleted');
      },
      error: () => {
        this.toastr.error('Failed to delete post');
      },
    });
  }
}
