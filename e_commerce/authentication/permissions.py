from rest_framework import permissions



class IsStaffOrReadOnly(permissions.BasePermission):
    # def has_permission(self, request, view):
    #     if request.method in permissions.SAFE_METHODS:
    #         return True
        
    #     if request.user.is_staff:
    #         return True

    #     return False

    # def has_object_permission(self, request, view, obj):
    #     if request.method in permissions.SAFE_METHODS and obj.public == True:
    #         return True
    #     if request.user.is_staff:
    #         return True
    #     return False
    
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated)