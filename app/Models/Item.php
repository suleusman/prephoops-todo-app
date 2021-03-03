<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
 public function user(){
     return $this->belongsTo(User::class);

 }
public function category(){ 
    return $this->belongsTo(Category::class);
}
 protected $fillable = ['content', 'completed', 'category_id' ];
}
