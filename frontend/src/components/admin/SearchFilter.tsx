import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface SearchFilterProps {
  language: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  statusOptions: { value: string; label: { ar: string; en: string } }[];
  placeholder?: { ar: string; en: string };
}

export function SearchFilter({
  language,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  statusOptions,
  placeholder = { ar: 'ابحث...', en: 'Search...' }
}: SearchFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6">
      <div className="relative flex-1">
        <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder={placeholder[language as 'ar' | 'en']}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="ps-9"
        />
      </div>
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder={language === 'ar' ? 'الحالة' : 'Status'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {language === 'ar' ? 'الكل' : 'All'}
            </SelectItem>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label[language as 'ar' | 'en']}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
