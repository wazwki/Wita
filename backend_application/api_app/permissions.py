from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsOwnerOrStaffOrReadOnly(BasePermission):
    """
    The request is authenticated as a user, or is a read-only request.
    """

    def has_object_permission(self, request, view, obj):
        return bool(
            request.method in SAFE_METHODS or
            request.user and
            request.user.is_authenticated and
            obj.owner == request.user or
            request.user.is_staff
        )


class IsOwnerOrInGroup(BasePermission):
    """
    Custom permission to only allow owners of an object or users in the same group to view/edit it.
    """
    def has_object_permission(self, request, view, obj):
        # Проверяем, является ли пользователь создателем объекта
        if obj.created_by == request.user:
            return True
        
        # Проверяем, находится ли пользователь в группе, связанной с объектом
        if hasattr(obj, 'group'):
            return obj.group in request.user.profile.groups.all()
        
        return False
