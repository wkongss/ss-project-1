export default function nestedAccess(obj: any, access: string): any {
    try {
        return access.split('.').reduce((a, e) => a[e], obj);
    } catch (error) {
        return null;
    }
}