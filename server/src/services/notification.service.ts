import { db } from "../prisma/db";

export async function getAllNotifications() {
  return await db.orm.public.Notification.all();
}

export async function getNotificationsByUser(userId: string) {
  const notifications = await db.orm.public.Notification.all();

  return notifications.filter(
    (notification) => notification.userId === userId,
  );
}

export async function createNotification(
  userId: string,
  title: string,
  body: string,
  type?: string,
) {
  return await db.orm.public.Notification.create({
    userId,
    title,
    body,
    type,
    read: false,
  });
}