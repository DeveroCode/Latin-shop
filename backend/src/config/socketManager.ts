export class SocketManager {
  private static onlineUsers: Map<string, string> = new Map();

  static addUser(userId: string, socketId: string) {
    this.onlineUsers.set(userId, socketId);
  }

  static removeBySocketId(socketId: string) {
    for (const [userId, sId] of this.onlineUsers.entries()) {
      if (sId === socketId) {
        this.onlineUsers.delete(userId);
        return userId;
      }
    }
    return undefined;
  }

  static getSocketId(userId: string): string | undefined {
    return this.onlineUsers.get(userId);
  }

  static isOnline(userId: string): boolean {
    return this.onlineUsers.has(userId);
  }

  static listOnline() {
    return Array.from(this.onlineUsers.keys());
  }
}
