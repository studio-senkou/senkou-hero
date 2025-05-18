'use client'

import { Checkbox } from '@hero/components/ui/checkbox'
import { CartItem } from '@hero/types/dto'
import { ColumnDef } from '@tanstack/react-table'

export const cartColumns = (): ColumnDef<CartItem>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Product',
    size: 250,
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <img
          src={row.original.image}
          alt={row.original.name}
          className="w-10 h-10 rounded-md"
        />
        <div>
          <p className="text-sm font-medium">{row.original.name}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    size: 100, // Example: adjust width
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    size: 80, // Example: adjust width
  },
]
