// Types for raw SQL query results

// Like record structure from database
export interface DbLike {
  id: string;
  createdAt: Date;
  userId: string;
  commentId?: string;
  postId?: string;
}

// Count result from SQL query
export interface CountResult {
  count: string | number;
}

// Comment reference
export interface CommentReference {
  commentId: string;
} 