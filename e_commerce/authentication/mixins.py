
from .permissions import IsStaffOrReadOnly


class StaffOrReadOnlyMixin():
    permission_classes = [IsStaffOrReadOnly]





