import { PrismaClient, UserRole } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

const DEFAULT_ADMINS = [
  'alexander.v.jenkins@gmail.com',
  // Add more admin emails as needed
];

async function main() {
  console.log('Starting seeding...');

  // Set up default role permissions
  const rolePermissions = [
    {
      role: UserRole.ADMIN,
      canDeletePosts: true,
      canDeleteComments: true,
      canBanUsers: true,
      canEditPosts: true,
      canPinPosts: true,
      canManageRoles: true,
    },
    {
      role: UserRole.MODERATOR,
      canDeletePosts: true,
      canDeleteComments: true,
      canBanUsers: false,
      canEditPosts: true,
      canPinPosts: true,
      canManageRoles: false,
    },
    {
      role: UserRole.USER,
      canDeletePosts: false,
      canDeleteComments: false,
      canBanUsers: false,
      canEditPosts: false,
      canPinPosts: false,
      canManageRoles: false,
    },
  ];

  for (const permission of rolePermissions) {
    await prisma.rolePermission.upsert({
      where: { role: permission.role },
      update: permission,
      create: permission,
    });
    console.log(`Set up permissions for role: ${permission.role}`);
  }

  // Create default test user
  const testUserEmail = 'user@example.com';
  const existingUser = await prisma.user.findUnique({
    where: { email: testUserEmail },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        name: 'Demo User',
        email: testUserEmail,
        password: await hash('password', 10),
        image: 'https://i.pravatar.cc/150?u=user@example.com',
        emailNotifications: true,
        commentNotifications: true,
        digestNotifications: true,
        role: UserRole.USER,
      },
    });
    console.log('Created test user');
  } else {
    // Update the existing user to include notification preferences if they're missing
    if (existingUser.emailNotifications === undefined) {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          emailNotifications: true,
          commentNotifications: true,
          digestNotifications: true,
        },
      });
      console.log('Updated test user with notification preferences');
    } else {
      console.log('Test user already has notification preferences');
    }
    console.log('Test user already exists');
  }

  // Create forum categories
  const categories = [
    {
      name: 'Human Connection & Community',
      description: 'Exploring ways to deepen human relationships and build authentic community',
      slug: 'human-connection',
    },
    {
      name: 'Decentralized Governance',
      description: 'Discussing models for participatory democracy and collective decision-making',
      slug: 'governance',
    },
    {
      name: 'Sustainability & Regeneration',
      description: 'Sharing practices for living in harmony with ecological systems',
      slug: 'sustainability',
    },
    {
      name: 'Festival Planning & Vision',
      description: 'Collaborating on the Evolve festival concept and implementation',
      slug: 'festival-planning',
    },
  ];

  for (const category of categories) {
    const existingCategory = await prisma.forumCategory.findUnique({
      where: { slug: category.slug },
    });

    if (!existingCategory) {
      await prisma.forumCategory.create({
        data: category,
      });
      console.log(`Created category: ${category.name}`);
    } else {
      console.log(`Category already exists: ${category.name}`);
    }
  }

  // Create sample events
  const events = [
    {
      title: 'Summer Evolve Festival 2024',
      description: 'Join us for a weekend of connection, learning, and celebration as we explore what it means to evolve together.',
      location: 'Asheville, NC',
      startDate: new Date('2024-07-15T10:00:00Z'),
      endDate: new Date('2024-07-17T18:00:00Z'),
      capacity: 200,
    },
    {
      title: 'Community Sensemaking Workshop',
      description: 'Learn practical tools for navigating complexity and making sense of our rapidly changing world together.',
      location: 'Online',
      startDate: new Date('2024-05-20T18:00:00Z'),
      endDate: new Date('2024-05-20T20:00:00Z'),
      capacity: 50,
    },
  ];

  for (const event of events) {
    // Check if the event already exists (by title and start date)
    const existingEvent = await prisma.event.findFirst({
      where: {
        title: event.title,
        startDate: event.startDate,
      },
    });

    if (!existingEvent) {
      await prisma.event.create({
        data: event,
      });
      console.log(`Created event: ${event.title}`);
    } else {
      console.log(`Event already exists: ${event.title}`);
    }
  }

  // Upsert default admin users
  for (const email of DEFAULT_ADMINS) {
    await prisma.user.upsert({
      where: { email },
      update: { 
        role: UserRole.ADMIN,
        password: await hash('adminpassword', 10),
      },
      create: {
        email,
        role: UserRole.ADMIN,
        name: 'Admin',
        password: await hash('adminpassword', 10),
        emailNotifications: true,
        commentNotifications: true,
        digestNotifications: true,
      },
    });
    console.log(`Upserted admin user: ${email}`);
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 