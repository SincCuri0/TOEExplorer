import { Resend } from 'resend';

// Initialize Resend with API key (from environment variables) or create a mock implementation
let resend: Resend;
const mockEmailResponse = { id: 'mock-email-id', from: '', to: '', subject: '' };

// Check if API key exists
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  // Create a mock implementation for development
  console.warn('No RESEND_API_KEY found in environment variables. Using mock email service.');
  resend = {
    emails: {
      send: async () => ({ data: mockEmailResponse, error: null })
    }
  } as unknown as Resend;
}

// Default from email address
const DEFAULT_FROM = process.env.EMAIL_FROM || 'notifications@evolve-community.org';

/**
 * Email template for welcome emails sent after registration
 */
export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: DEFAULT_FROM,
      to: email,
      subject: 'Welcome to Evolve Community!',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #993322;">Welcome to Evolve Community!</h1>
          <p>Hello ${name || 'there'},</p>
          <p>
            Thank you for joining the Evolve Community. We're excited to have you with us on this journey of
            sensemaking and connection around topics that matter.
          </p>
          <p>
            Feel free to explore our forum, join discussions, and connect with other community members.
          </p>
          <div style="margin: 30px 0;">
            <a 
              href="${process.env.NEXT_PUBLIC_APP_URL}/forum" 
              style="background-color: #993322; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;"
            >
              Visit the Forum
            </a>
          </div>
          <p>
            If you have any questions or need assistance, don't hesitate to contact us.
          </p>
          <p>Warm regards,<br>The Evolve Community Team</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception sending welcome email:', error);
    return { success: false, error };
  }
};

/**
 * Email notification for new comments on a user's post
 */
export const sendNewCommentNotification = async (
  postAuthorEmail: string, 
  postAuthorName: string,
  postTitle: string,
  postId: string,
  commentAuthorName: string
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: DEFAULT_FROM,
      to: postAuthorEmail,
      subject: `New comment on your post: ${postTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #993322;">New Comment on Your Post</h1>
          <p>Hello ${postAuthorName || 'there'},</p>
          <p>
            ${commentAuthorName} has commented on your post "<strong>${postTitle}</strong>".
          </p>
          <div style="margin: 30px 0;">
            <a 
              href="${process.env.NEXT_PUBLIC_APP_URL}/forum/post/${postId}" 
              style="background-color: #993322; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;"
            >
              View Comment
            </a>
          </div>
          <p>
            Thank you for your contribution to the Evolve Community.
          </p>
          <p>Warm regards,<br>The Evolve Community Team</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #666;">
            You received this email because you enabled notifications for your posts.
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/profile/notifications">Manage notification settings</a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending comment notification email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception sending comment notification email:', error);
    return { success: false, error };
  }
};

/**
 * Email notification for a reply to a user's comment
 */
export const sendCommentReplyNotification = async (
  originalCommentAuthorEmail: string,
  originalCommentAuthorName: string,
  postTitle: string,
  postId: string,
  replyAuthorName: string
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: DEFAULT_FROM,
      to: originalCommentAuthorEmail,
      subject: `Someone replied to your comment on: ${postTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #993322;">New Reply to Your Comment</h1>
          <p>Hello ${originalCommentAuthorName || 'there'},</p>
          <p>
            ${replyAuthorName} has replied to your comment on the post "<strong>${postTitle}</strong>".
          </p>
          <div style="margin: 30px 0;">
            <a 
              href="${process.env.NEXT_PUBLIC_APP_URL}/forum/post/${postId}" 
              style="background-color: #993322; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;"
            >
              View Reply
            </a>
          </div>
          <p>
            Thank you for your participation in the Evolve Community.
          </p>
          <p>Warm regards,<br>The Evolve Community Team</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #666;">
            You received this email because you enabled notifications for comments.
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/profile/notifications">Manage notification settings</a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending comment reply notification email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception sending comment reply notification email:', error);
    return { success: false, error };
  }
};

/**
 * Email digest of recent forum activity (sent weekly)
 */
export const sendForumDigest = async (
  userEmail: string,
  userName: string,
  newPosts: Array<{ id: string; title: string; category: string }>,
  popularPosts: Array<{ id: string; title: string; commentCount: number }>
) => {
  try {
    // Early return if there's no activity to report
    if (newPosts.length === 0 && popularPosts.length === 0) {
      return { success: true, skipped: true };
    }

    const { data, error } = await resend.emails.send({
      from: DEFAULT_FROM,
      to: userEmail,
      subject: 'Your Weekly Forum Digest | Evolve Community',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #993322;">Your Weekly Forum Digest</h1>
          <p>Hello ${userName || 'there'},</p>
          <p>
            Here's a summary of what's been happening in the Evolve Community forum this week:
          </p>
          
          ${newPosts.length > 0 ? `
            <h2 style="color: #993322; margin-top: 30px;">New Discussions</h2>
            <ul style="padding-left: 20px;">
              ${newPosts.map(post => `
                <li style="margin-bottom: 10px;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/forum/post/${post.id}" style="color: #993322; text-decoration: none; font-weight: bold;">
                    ${post.title}
                  </a>
                  <span style="color: #666; font-size: 14px;"> in ${post.category}</span>
                </li>
              `).join('')}
            </ul>
          ` : ''}
          
          ${popularPosts.length > 0 ? `
            <h2 style="color: #993322; margin-top: 30px;">Popular Discussions</h2>
            <ul style="padding-left: 20px;">
              ${popularPosts.map(post => `
                <li style="margin-bottom: 10px;">
                  <a href="${process.env.NEXT_PUBLIC_APP_URL}/forum/post/${post.id}" style="color: #993322; text-decoration: none; font-weight: bold;">
                    ${post.title}
                  </a>
                  <span style="color: #666; font-size: 14px;"> (${post.commentCount} comments)</span>
                </li>
              `).join('')}
            </ul>
          ` : ''}
          
          <div style="margin: 30px 0;">
            <a 
              href="${process.env.NEXT_PUBLIC_APP_URL}/forum" 
              style="background-color: #993322; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;"
            >
              Visit the Forum
            </a>
          </div>
          
          <p>See you in the community!</p>
          <p>Warm regards,<br>The Evolve Community Team</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #666;">
            You received this email because you're subscribed to forum digests.
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/profile/notifications">Manage notification settings</a>
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending forum digest email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception sending forum digest email:', error);
    return { success: false, error };
  }
};

/**
 * Generic email template for system notifications
 */
export const sendSystemNotification = async (
  email: string,
  subject: string,
  message: string,
  ctaLink?: string,
  ctaText?: string
) => {
  try {
    const { data, error } = await resend.emails.send({
      from: DEFAULT_FROM,
      to: email,
      subject,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #993322;">Evolve Community Notification</h1>
          <p>${message}</p>
          
          ${ctaLink && ctaText ? `
          <div style="margin: 30px 0;">
            <a 
              href="${ctaLink}" 
              style="background-color: #993322; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;"
            >
              ${ctaText}
            </a>
          </div>
          ` : ''}
          
          <p>Warm regards,<br>The Evolve Community Team</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending system notification email:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception sending system notification email:', error);
    return { success: false, error };
  }
}; 