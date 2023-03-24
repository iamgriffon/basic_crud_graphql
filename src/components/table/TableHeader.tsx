interface THeaderProps {
  data: string
  align: string
}

export function TableHeader({data, align}: THeaderProps) {
  return (
      <th
        scope="col"
        className={`px-6 py-3 text-${align} text-xs font-medium text-gray-500 uppercase tracking-wider`}
      >
        {data}
      </th>
  );
}
