<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
   // use HasFactory;

   public function Items(){
       return $this->hasMany(Category::class);
   }

   protected $fillable=['name'];
}
