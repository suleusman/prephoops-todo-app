<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class ItemController extends Controller
{
    public function _construct(){
        $this->middleware('auth');
    }
    public function index(Request $request, Item $item )
    {
        //Get all the todo items based on the current user
        $todoItems = $item->whereIn('user_id', $request->user())->with('user');
        $items = $todoItems->orderBy('created_at', 'desc')->get();
        //return json response 
        return response()->json(['items' => $items]);
    }

    
    public function create()
    {
        //
    }

    
    public function store(Request $request)
    {
        //validation
        $this->validate($request, ['content' => 'required|max:255']);
        //craete a new todo item based on user item relationship
        $item = $request->user()->items()->create([
            'content' => $request->content,
            'category_id'=> $request->category
        ]);
   //return item with user object
    return response()->json($item->with('user')->find($item->id));
   
}
    public function show($id)
    {
        //
    }

    
    public function edit($id)
    {
        $item = Item::findOrFail($id);
        return response()->json([
            'item'=>$item]);
    }

    
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $item = Item::findOrFail($id);
        $item->update($input);
        return response()->json($item->with('user')->find($item->id));
    }
    public function destroy($id)        
    {
        Item::findorFail($id)->delete();
    
    }
    
   public function isComplete($id)
      {
        $item = Item::findOrFail($id);        
        $item->completed = !$item->completed;
        $item->save();
        
        return response()->json($item->with('user')->find($item->id));
      }
}
