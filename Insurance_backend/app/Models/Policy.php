<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Policy extends Model
{
    use HasFactory;

    protected $fillable = [
        'policy_number',
        'customer_name',
        'policy_type',
        'status',
        'premium_amount',
        'start_date',
        'end_date',
    ];
}
