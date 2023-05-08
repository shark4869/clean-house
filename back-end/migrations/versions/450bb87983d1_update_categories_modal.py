"""Update categories modal

Revision ID: 450bb87983d1
Revises: 5977bd305794
Create Date: 2023-05-08 15:49:27.392557

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '450bb87983d1'
down_revision = '5977bd305794'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('categories', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.String(length=200), nullable=True))
        batch_op.add_column(sa.Column('image', sa.String(length=200), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('categories', schema=None) as batch_op:
        batch_op.drop_column('image')
        batch_op.drop_column('description')

    # ### end Alembic commands ###
