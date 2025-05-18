'use client'

import { Checkbox } from '@hero/components/ui/checkbox'
import { CartItem } from '@hero/types/dto'
import { ColumnDef } from '@tanstack/react-table'
import { Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'

interface CartColumnsProps {
  onSelect: (id: string) => void
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  deleteProduct: (id: string) => void
}

export const cartColumns = ({
  onSelect,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
}: CartColumnsProps): ColumnDef<CartItem>[] => [
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
        onCheckedChange={(value) => {
          row.toggleSelected(!!value)
          onSelect(row.original.id)
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Product',
    size: 200,
    cell: ({ row }) => (
      <div className="flex items-center space-x-2">
        <Image
          src={row.original.image}
          alt={row.original.name}
          className="rounded-md"
          width={50}
          height={50}
        />
        <p className="text-sm font-medium line-clamp-1">{row.original.name}</p>
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    size: 100,
    cell: ({ row }) => (
      <span>
        {row.original.price.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </span>
    ),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantity',
    size: 80,
    cell: ({ row }) => (
      <div className="flex justify-center items-center space-x-2 p-1 rounded-full border border-neutral-200 h-full max-w-28">
        <button
          onClick={() => decreaseQuantity(row.original.id)}
          className="flex justify-center items-center w-8 h-8 text-lg font-bold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors cursor-pointer"
        >
          <Minus size={16} />
        </button>
        <span className="min-w-[24px] text-center flex items-center justify-center h-8">
          {row.original.quantity}
        </span>
        <button
          onClick={() => increaseQuantity(row.original.id)}
          className="flex justify-center items-center w-8 h-8 text-lg font-bold text-neutral-600 bg-neutral-100 hover:bg-neutral-200 rounded-full transition-colors cursor-pointer"
        >
          <Plus size={16} />
        </button>
      </div>
    ),
  },
  {
    header: 'Subtotal',
    accessorFn: (row) => row.price * row.quantity,
    cell: ({ row }) => (
      <span>
        {(row.original.price * row.original.quantity).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </span>
    ),
  },
  {
    id: 'delete',
    header: '',
    cell: ({ row }) => (
      <button
        className="border border-neutral-200 rounded-full p-[3px] hover:bg-neutral-100 cursor-pointer transition-colors"
        onClick={() => deleteProduct(row.original.id)}
      >
        <X size={12} />
      </button>
    ),
  },
]
