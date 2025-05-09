/**
 * Extrait les initiales d'un nom
 * @param name Le nom complet
 * @returns Les initiales (maximum 2 caractères)
 */
export const getInitials = (name: string): string => {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
};

/**
 * Génère une couleur de fond basée sur un nom
 * @param name Le nom à utiliser pour générer la couleur
 * @returns Une couleur hexadécimale
 */
export const getRandomColor = (name: string): string => {
    const colors = [
        "#3B82F6", // blue-500
        "#22C55E", // green-500
        "#EAB308", // yellow-500
        "#EF4444", // red-500
        "#A855F7", // purple-500
        "#EC4899", // pink-500
        "#6366F1", // indigo-500
    ];
    const index = name
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
};

/**
 * Interface pour les options de l'avatar
 */
interface AvatarOptions {
    name: string;
    imagePath?: string | null;
    size?: "sm" | "md" | "lg";
    className?: string;
}

/**
 * Génère les classes CSS pour l'avatar en fonction de la taille
 * @param size La taille de l'avatar
 * @returns Les classes CSS pour la taille
 */
const getSizeClasses = (size: AvatarOptions["size"] = "md"): string => {
    const sizes = {
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-12 h-12 text-lg",
    };
    return sizes[size];
};

/**
 * Génère les classes CSS pour l'avatar
 * @param options Les options de l'avatar
 * @returns Les classes CSS pour l'avatar
 */
export const getAvatarClasses = (options: AvatarOptions): string => {
    const { size = "md", className = "" } = options;
    const baseClasses =
        "rounded-full overflow-hidden flex items-center justify-center text-white font-medium";
    const sizeClasses = getSizeClasses(size);
    return `${baseClasses} ${sizeClasses} ${className}`;
};

/**
 * Génère les props pour l'image de l'avatar
 * @param options Les options de l'avatar
 * @returns Les props pour l'image
 */
export const getAvatarImageProps = (options: AvatarOptions) => {
    const { name, imagePath, size = "md" } = options;
    const sizeClasses = getSizeClasses(size);

    return {
        src: imagePath || "",
        alt: name,
        className: `object-cover ${sizeClasses}`,
    };
};
