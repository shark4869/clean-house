from .extentions import ma


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'email',
                  'address', 'gender', 'phone', 'birth_date', 'avatar', 'role_id')


class RoleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')


class CategorySchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'description', 'image')


class ServiceSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name', 'category_id',
                  'description', 'employee_id', 'price', 'is_deleted')


class BookSchema(ma.Schema):
    class Meta:
        fields = ('id', 'service_id', 'customer_id', 'book_date', 'status_id',
                  'workplace', 'start_time', 'timer', 'note', 'total', 'payment_id', 'status_update')


class RateSchema(ma.Schema):
    class Meta:
        fields = ('id', 'service_id', 'customer_id',
                  'rate', 'comment', 'rate_date')


class StatusSchema(ma.Schema):
    class Meta:
        fields = ('id', 'name')


class PaymentSchema(ma.Schema):
    class Meta:
        fields = ('id', 'method')


class BanerSchema(ma.Schema):
    class Meta:
        fields = ('id', 'image', 'active')


class ProcessSchema(ma.Schema):
    class Meta:
        fields = ('id', 'image', 'name', 'description')
