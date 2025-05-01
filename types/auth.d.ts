type UserType = {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    emailVerificationToken: string | null;
    emailVerificationTokenExpiresAt: string | null;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    isAdmin: boolean;
    isActive: boolean;
    logCount: number;
};

type TokenData = {
    type: string;
    name: string | null;
    token: string;
    abilities: Array<string>;
    lastUsedAt: string | null;
    expiresAt: string | null;
};

type LoginMutation = {
    email: string;
    password: string;
};
