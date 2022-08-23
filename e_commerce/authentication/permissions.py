from rest_framework import permissions



class IsStaffOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_staff:
            return True
        if request.method in permissions.SAFE_METHODS:
            return True

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_staff:
            return True
    
    # def has_permission(self, request, view):
    #     return bool(request.user and request.user.is_authenticated)