'use client'

import { Checkbox } from '@hero/components/ui/checkbox'
import type { CartItem } from '@hero/types/dto'
import type { ColumnDef } from '@tanstack/react-table'
import { Minus, Plus, X } from 'lucide-react'
import Image from 'next/image'

interface CartColumnsProps {
  onSelect: (id: string) => void
  onDeselect: (id: string) => void
  isItemSelected: (id: string) => boolean
  increaseQuantity: (id: string) => void
  decreaseQuantity: (id: string) => void
  deleteProduct: (id: string) => void
}

export const cartColumns = ({
  onSelect,
  onDeselect,
  isItemSelected,
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
        checked={isItemSelected(row.original.id)}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value)
          if (value) {
            onSelect(row.original.id)
          } else {
            onDeselect(row.original.id)
          }
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
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-neutral-100 flex items-center justify-center">
          <Image
            src={
              row.original.image
                ? `${process.env.NEXT_PUBLIC_SUPABASE_S3}/products/${row.original.image}`
                : 'https://placehold.in/200.webp'
            }
            alt={row.original.name}
            className="object-cover w-full h-full"
            width={48}
            height={48}
          />
        </div>
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
