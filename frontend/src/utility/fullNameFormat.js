export const fullNameFormat = (user) => {
    if (!user) return "";

    const capitalize = (str) =>
        str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

    return `${capitalize(user.first_name)} ${capitalize(
        user.last_name
    )}`.trim();
};
